import React from 'react';
import { Bell, CircleHelp } from 'lucide-react';

export function TopNav() {
  return (
    <header className="h-[60px] border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-10 h-full">
        <div className="font-bold text-[1.1rem] text-gray-900 tracking-tight">AI Agent</div>
        <nav className="flex items-center gap-8 h-full">
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Workflows</a>
          <a href="#" className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 h-full flex items-center mt-[1px]">Runs</a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Settings</a>
        </nav>
      </div>
      <div className="flex items-center gap-5">
        <button className="text-gray-500 hover:text-gray-700 transition-colors"><Bell size={20} strokeWidth={2} /></button>
        <button className="text-gray-500 hover:text-gray-700 transition-colors"><CircleHelp size={20} strokeWidth={2} /></button>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
          Deploy
        </button>
      </div>
    </header>
  );
}
