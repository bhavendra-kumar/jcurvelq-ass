import useRunState from "./hooks/useRunState";
import useMockEmitter from "./hooks/useMockEmitter";
import useTimer from "./hooks/useTimer";

import TopNav from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import HeaderCard from "./components/layout/HeaderCard";

import TimelineNode from "./components/timeline/TimelineNode";
import TaskCard from "./components/timeline/TaskCard";

import FinalAnalysisPanel from "./components/panels/FinalAnalysisPanel";
import EmptyState from "./components/panels/EmptyState";

export default function App() {
  const { run, tasks, handleEvent } = useRunState();
  useMockEmitter(handleEvent);

  const time = useTimer(run.startTime);

  const taskList = Object.values(tasks);

  return (
    <div className="flex flex-col h-screen">
      <TopNav />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <HeaderCard run={run} time={time} />

          <div className="grid grid-cols-2 gap-6">
            {/* LEFT: timeline */}
            <div className="space-y-4">
              {taskList.length === 0 ? (
                <EmptyState />
              ) : (
                taskList.map((task) => (
                  <TimelineNode key={task.id}>
                    <TaskCard task={task} />
                  </TimelineNode>
                ))
              )}
            </div>

            {/* RIGHT: final output */}
            <FinalAnalysisPanel output={run.output} />
          </div>
        </main>
      </div>
    </div>
  );
}