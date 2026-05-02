import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { TaskState } from '../hooks/useRunState';

export function TaskCard({
  title,
  agentName,
  agentIcon,
  status,
  statusVariant,
  isActive = false,
  isError = false,
  isCancelled = false,
  task
}: {
  title: string;
  agentName: string;
  agentIcon: React.ReactNode;
  status: string;
  statusVariant: 'success' | 'pending' | 'error' | 'cancelled';
  isActive?: boolean;
  isError?: boolean;
  isCancelled?: boolean;
  task?: TaskState;
}) {
  
  const statusColors = {
    success: 'text-green-700',
    pending: 'text-[#b05a22]',
    error: 'text-red-600',
    cancelled: 'text-gray-500'
  };

  const cardBaseStyle = "bg-white border rounded-[1.25rem] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all relative overflow-hidden";
  let specificStyle = "border-gray-200";
  
  if (isActive) specificStyle = "border-gray-200 border-l-[3px] border-l-blue-500 bg-[#fbfdff]";
  if (isError) specificStyle = "bg-[#fff8f8] border-red-200";
  if (isCancelled) specificStyle = "opacity-75 border-gray-200";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${cardBaseStyle} ${specificStyle}`}
    >
      {/* Shimmer effect for Complete status */}
      {statusVariant === 'success' && (
        <motion.div 
          className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-green-100/50 to-transparent pointer-events-none w-[200%]"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
        />
      )}

      {/* Pulsing effect for Running status */}
      {isActive && (
        <motion.div
           className="absolute inset-0 z-0 border-[2px] border-blue-400 rounded-[1.25rem] pointer-events-none"
           initial={{ opacity: 0 }}
           animate={{ opacity: [0, 0.4, 0] }}
           transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        />
      )}

      <div className="flex flex-col gap-3 relative z-10 w-full overflow-hidden">
        <h3 className={`font-semibold text-[1.05rem] tracking-tight ${isCancelled ? 'text-gray-500' : 'text-gray-900'}`}>
          {title}
        </h3>
        
        <div className="flex justify-between items-center text-xs">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${isCancelled ? 'bg-gray-50/50 border-gray-200/50 text-gray-400' : 'bg-gray-100 border-gray-200/60 text-gray-600 font-medium'}`}>
            {React.cloneElement(agentIcon as React.ReactElement, { size: 14, className: isCancelled ? 'opacity-50' : '' })}
            <span>{agentName}</span>
          </div>
          <span className={`font-semibold tracking-wide ${statusColors[statusVariant]}`}>
            {status}
          </span>
        </div>
        
        {task && (
          <div className="mt-1 w-full space-y-2">
            {task.toolCalls.map(tc => {
              const commandPrefix = tc.command.includes('(') ? tc.command.split('(')[0] : tc.command;
              const commandSuffix = tc.command.includes('(') ? '(' + tc.command.split('(').slice(1).join('(') : '';
              return (
                <div key={tc.id} className="bg-[#0f172a] rounded-xl p-4 mt-2 font-mono text-[13px] leading-relaxed shadow-inner overflow-hidden w-full break-all">
                  <div className="flex gap-2 mb-2 w-full">
                    <span className="text-gray-500 font-semibold">$</span>
                    <span className="text-blue-400 whitespace-pre-wrap flex-1">{commandPrefix}<span className="text-blue-300/80">{commandSuffix}</span></span>
                  </div>
                  {tc.result && (
                    <div className="flex items-center gap-2 text-emerald-400 font-medium mt-3">
                      <Check size={14} strokeWidth={3} className="shrink-0" />
                      {tc.result} {tc.duration ? `in ${tc.duration}` : ''}
                    </div>
                  )}
                </div>
              );
            })}
            
            {task.outputs.map(out => (
              <div key={out.id} className={`w-full mt-2 text-[13px] font-medium p-3 rounded-lg border ${
                out.isError 
                  ? 'bg-[#181119] border-red-900/30 font-mono shadow-inner' 
                  : out.isCancelled
                  ? 'bg-transparent border-transparent text-gray-500 italic p-0'
                  : 'text-blue-500 bg-blue-50/80 border-blue-100 flex items-center gap-2 tracking-wide'
              }`}>
                {!out.isCancelled && <span className={out.isError ? "text-red-400" : "text-blue-400"}>&gt;</span>}
                <span className={out.isError ? "text-red-400 leading-relaxed font-medium block flex-1" : "flex-1"}>{' '}{out.text}</span>
                {out.isStreaming && <span className="inline-block w-1.5 h-3 bg-blue-400 ml-1 animate-pulse shrink-0"></span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
