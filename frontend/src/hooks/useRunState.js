import { useState } from "react";

export default function useRunState() {
  const [run, setRun] = useState({
    status: "idle",
    query: "",
    startTime: null,
    output: null,
  });

  const [tasks, setTasks] = useState({});

  const handleEvent = (event) => {
    switch (event.type) {
      case "run_started":
        setRun({
          status: "running",
          query: event.query,
          startTime: Date.now(),
          output: null,
        });
        break;

      case "task_spawned":
        setTasks((prev) => ({
          ...prev,
          [event.task_id]: {
            id: event.task_id,
            label: event.label,
            agent: event.agent,
            status: "running",
            toolCalls: [],
            outputs: [],
          },
        }));
        break;

      case "tool_call":
        setTasks((prev) => ({
          ...prev,
          [event.task_id]: {
            ...prev[event.task_id],
            toolCalls: [...prev[event.task_id].toolCalls, event],
          },
        }));
        break;

      case "partial_output":
        setTasks((prev) => ({
          ...prev,
          [event.task_id]: {
            ...prev[event.task_id],
            outputs: [...prev[event.task_id].outputs, event],
          },
        }));
        break;

      case "task_update":
        setTasks((prev) => ({
          ...prev,
          [event.task_id]: {
            ...prev[event.task_id],
            status: event.status,
          },
        }));
        break;

      case "run_complete":
        setRun((prev) => ({
          ...prev,
          status: "complete",
          output: event.output,
        }));
        break;

      case "run_error":
        setRun((prev) => ({
          ...prev,
          status: "failed",
        }));
        break;

      default:
        break;
    }
  };

  return { run, tasks, handleEvent };
}