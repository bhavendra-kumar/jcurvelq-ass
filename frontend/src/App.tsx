import React, { useEffect } from 'react';
import { useRunState, TaskState } from './hooks/useRunState';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { HeaderCard } from './components/HeaderCard';
import { FinalAnalysisPanel } from './components/FinalAnalysisPanel';
import { TimelineNode } from './components/TimelineNode';
import { TaskCard } from './components/TaskCard';
import { iconMap } from './utils/icons';
import { AlertCircle, Ban, Check, Circle, RefreshCw, Square } from 'lucide-react';

export default function App() {
  const { state, startRun } = useRunState();

  useEffect(() => {
    // Automatically start simulation on mount
    startRun('success');
  }, [startRun]);

  // Group tasks for timeline rendering
  const timelineNodes: { type: 'single' | 'group', tasks: TaskState[], groupName?: string }[] = [];
  let currentGroup: string | null = null;
  let groupTasks: TaskState[] = [];

  for (const task of state.tasks) {
    if (task.parallelGroup) {
      if (currentGroup === task.parallelGroup) {
        groupTasks.push(task);
      } else {
        if (groupTasks.length > 0) timelineNodes.push({ type: 'group', tasks: groupTasks, groupName: currentGroup! });
        currentGroup = task.parallelGroup;
        groupTasks = [task];
      }
    } else {
      if (groupTasks.length > 0) {
         timelineNodes.push({ type: 'group', tasks: groupTasks, groupName: currentGroup! });
         groupTasks = [];
         currentGroup = null;
      }
      timelineNodes.push({ type: 'single', tasks: [task] });
    }
  }
  if (groupTasks.length > 0) {
    timelineNodes.push({ type: 'group', tasks: groupTasks, groupName: currentGroup! });
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans antialiased text-gray-900 selection:bg-blue-100">
      <TopNav />
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-60px)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto w-full">
          <div className="max-w-[1400px] mx-auto p-6 md:p-8 space-y-8">
            
            <div className="flex justify-between items-center mb-[-1rem]">
              <div className="space-x-3">
                <button 
                  onClick={() => startRun('success')} 
                  className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm"
                >
                  Restart (Success)
                </button>
                <button 
                  onClick={() => startRun('error')} 
                  className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-red-600 shadow-sm"
                >
                  Restart (Error)
                </button>
              </div>
            </div>

            <HeaderCard 
              query={state.query} 
              status={state.status} 
              elapsedTime={state.elapsedTime} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] xl:grid-cols-[1fr_0.8fr] gap-8 lg:gap-12 pl-2">
              
              {/* LEFT COLUMN - TIMELINE */}
              <div className="max-w-[500px]">
                {timelineNodes.length === 0 && (
                  <div className="text-gray-400 italic text-sm p-4">Waiting for run to start...</div>
                )}
                {timelineNodes.map((node, i) => {
                  const isLast = i === timelineNodes.length - 1;
                  
                  // Compute combined status icon / variant
                  let groupVariant: 'success' | 'running' | 'error' | 'cancelled' | 'default' = 'default';
                  let groupIcon = <Circle size={16} strokeWidth={2.5} />;
                  
                  const isFailed = node.tasks.some(t => t.status === 'failed');
                  const isRunningOrPending = node.tasks.some(t => t.status === 'running' || t.status === 'pending');
                  const isCancelled = node.tasks.every(t => t.status === 'cancelled');
                  const isSuccess = node.tasks.every(t => t.status === 'complete');
                  
                  if (isFailed) { groupVariant = 'error'; groupIcon = <AlertCircle size={16} strokeWidth={2.5} />; }
                  else if (isRunningOrPending) { groupVariant = 'running'; groupIcon = <RefreshCw size={16} className={node.type === 'group' ? 'animate-spin' : ''} strokeWidth={2.5} />; }
                  else if (isSuccess) { groupVariant = 'success'; groupIcon = <Check size={16} strokeWidth={3} />; }
                  else if (isCancelled) { groupVariant = 'cancelled'; groupIcon = <Ban size={16} strokeWidth={2.5} />; }

                  return (
                    <TimelineNode 
                      key={node.type === 'group' ? node.groupName : node.tasks[0].id}
                      icon={groupIcon} 
                      variant={groupVariant}
                      isLast={isLast}
                    >
                      {node.type === 'group' && (
                        <div className="flex mt-[-2px] mb-3">
                          <span className="inline-flex items-center px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-xs font-semibold tracking-wide shadow-sm">
                            Parallel Execution
                          </span>
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        {node.tasks.map(task => {
                          const statusVariantMap: Record<string, 'success' | 'pending' | 'error' | 'cancelled'> = {
                            complete: 'success', pending: 'pending', running: 'pending', failed: 'error', cancelled: 'cancelled'
                          };
                          
                          return (
                            <TaskCard
                              key={task.id}
                              title={task.label}
                              agentName={task.agent}
                              agentIcon={iconMap[task.agentIcon] || <Square/>}
                              status={task.statusLabel}
                              statusVariant={statusVariantMap[task.status] || 'pending'}
                              isActive={task.status === 'running'}
                              isError={task.status === 'failed'}
                              isCancelled={task.status === 'cancelled'}
                              task={task}
                            />
                          );
                        })}
                      </div>
                    </TimelineNode>
                  );
                })}
              </div>

              {/* RIGHT COLUMN - ANALYSIS PANEL */}
              <div>
                <FinalAnalysisPanel finalOutput={state.finalOutput} citations={state.citations} />
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
