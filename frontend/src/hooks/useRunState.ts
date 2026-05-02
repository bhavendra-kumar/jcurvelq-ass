import { useState, useEffect, useCallback, useRef } from 'react';
import { AppEvent, runSuccessEvents, runErrorEvents } from '../mock/fixtures';
import { mockEmitter } from '../mock/emitter';

export interface ToolCall {
  id: string;
  command: string;
  result?: string;
  duration?: string;
}

export interface PartialOutput {
  id: string;
  text: string;
  isStreaming?: boolean;
  isError?: boolean;
  isCancelled?: boolean;
}

export interface TaskState {
  id: string;
  label: string;
  agent: string;
  agentIcon: string;
  status: 'pending' | 'running' | 'complete' | 'failed' | 'cancelled';
  statusLabel: string;
  parallelGroup?: string;
  toolCalls: ToolCall[];
  outputs: PartialOutput[];
  startedAt: number;
}

export interface RunState {
  query: string;
  status: 'idle' | 'running' | 'complete' | 'failed';
  startTime: number | null;
  elapsedTime: number;
  finalOutput: string | null;
  errorMsg: string | null;
  citations: { id: string; title: string; url: string }[];
  tasks: TaskState[];
}

export function useRunState() {
  const [state, setState] = useState<RunState>({
    query: '',
    status: 'idle',
    startTime: null,
    elapsedTime: 0,
    finalOutput: null,
    errorMsg: null,
    citations: [],
    tasks: [],
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state.status === 'running') {
      timerRef.current = setInterval(() => {
        setState((s) => ({
          ...s,
          elapsedTime: s.startTime ? Date.now() - s.startTime : 0,
        }));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.status, state.startTime]);

  const handleEvent = useCallback((event: AppEvent) => {
    setState((prevState) => {
      const p = event.payload;
      switch (event.type) {
        case 'run_started':
          return {
            ...prevState,
            query: p.query,
            status: 'running',
            startTime: Date.now(),
            elapsedTime: 0,
            tasks: [],
            finalOutput: null,
            citations: [],
            errorMsg: null,
          };

        case 'task_spawned':
          return {
            ...prevState,
            tasks: [
              ...prevState.tasks,
              {
                id: p.id,
                label: p.label,
                agent: p.agent,
                agentIcon: p.icon,
                status: 'pending',
                statusLabel: 'Pending',
                parallelGroup: p.parallelGroup,
                toolCalls: [],
                outputs: [],
                startedAt: Date.now(),
              },
            ],
          };

        case 'task_update':
          return {
            ...prevState,
            tasks: prevState.tasks.map((t) =>
              t.id === p.id
                ? { ...t, status: p.status, statusLabel: p.statusLabel }
                : t
            ),
          };

        case 'tool_call':
          return {
            ...prevState,
            tasks: prevState.tasks.map((t) =>
              t.id === p.taskId
                ? {
                    ...t,
                    toolCalls: [
                      ...t.toolCalls,
                      { id: p.callId, command: p.command },
                    ],
                  }
                : t
            ),
          };

        case 'tool_result':
          return {
            ...prevState,
            tasks: prevState.tasks.map((t) =>
              t.id === p.taskId
                ? {
                    ...t,
                    toolCalls: t.toolCalls.map((tc) =>
                      tc.id === p.callId
                        ? { ...tc, result: p.result, duration: p.duration }
                        : tc
                    ),
                  }
                : t
            ),
          };

        case 'partial_output':
          return {
            ...prevState,
            tasks: prevState.tasks.map((t) => {
              if (t.id === p.taskId) {
                // If the incoming output has the same ID as an existing streaming one, update it.
                // Otherwise append it.
                const existingIndex = t.outputs.findIndex((o) => o.id === p.outputId);
                if (existingIndex >= 0) {
                  const newOutputs = [...t.outputs];
                  newOutputs[existingIndex] = {
                    id: p.outputId,
                    text: p.text,
                    isStreaming: p.isStreaming,
                    isError: p.isError,
                    isCancelled: p.isCancelled,
                  };
                  return { ...t, outputs: newOutputs };
                } else {
                  return {
                    ...t,
                    outputs: [
                      ...t.outputs,
                      {
                        id: p.outputId,
                        text: p.text,
                        isStreaming: p.isStreaming,
                        isError: p.isError,
                        isCancelled: p.isCancelled,
                      },
                    ],
                  };
                }
              }
              return t;
            }),
          };

        case 'run_complete':
          return {
            ...prevState,
            status: 'complete',
            finalOutput: p.finalOutput,
            citations: p.citations || [],
          };

        case 'run_error':
          return {
            ...prevState,
            status: 'failed',
            errorMsg: p.errorMsg,
          };

        default:
          return prevState;
      }
    });
  }, []);

  const startRun = useCallback((mode: 'success' | 'error' = 'success') => {
    const events = mode === 'success' ? runSuccessEvents : runErrorEvents;
    mockEmitter.start(events, handleEvent);
  }, [handleEvent]);

  const stopRun = useCallback(() => {
    mockEmitter.stop();
    setState(s => ({ ...s, status: 'idle' }));
  }, []);

  return { state, startRun, stopRun };
}
