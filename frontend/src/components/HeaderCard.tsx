import React from 'react';
import { Clock, Square, MoreVertical } from 'lucide-react';
import { formatTime } from '../utils/format';

export function HeaderCard({ query, status, elapsedTime }: { query: string; status: string; elapsedTime: number }) {
  const isRunning = status === 'running';

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] w-full flex justify-between items-start transition-all">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-[1.35rem] font-bold text-gray-900 tracking-tight">
            {query || 'Waiting for query...'}
          </h1>
          {isRunning && (
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-50 border border-red-100">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-wider text-red-600 uppercase">Live</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm">
          {status !== 'idle' && (
            <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${
              status === 'failed' ? 'bg-red-50 border-red-100 text-red-700' :
              status === 'complete' ? 'bg-green-50 border-green-100 text-green-700' :
              'bg-orange-50 border border-orange-100/50 text-orange-700'
            } font-medium text-xs capitalize`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                status === 'failed' ? 'bg-red-500' :
                status === 'complete' ? 'bg-green-500' :
                'bg-orange-500'
              }`}></span>
              {status}
            </div>
          )}
          <div className="flex items-center gap-1.5 text-gray-600 font-medium font-mono min-w-[60px]">
            <Clock size={16} className={isRunning ? "text-blue-500 animate-pulse" : "text-gray-400"} />
            {formatTime(elapsedTime)}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
          <Square size={20} className="fill-current opacity-20" />
        </button>
        <button className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
}
