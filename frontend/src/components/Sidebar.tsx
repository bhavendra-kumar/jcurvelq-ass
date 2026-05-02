import React from 'react';
import {
  LayoutDashboard,
  Layers,
  History,
  Database,
  Key,
  Book,
  Headphones
} from 'lucide-react';

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
        active 
          ? 'bg-blue-50/80 text-blue-700' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <div className={`${active ? 'text-blue-600' : 'text-gray-400'}`}>{icon}</div>
      {label}
    </a>
  );
}

export function Sidebar() {
  return (
    <aside className="w-[240px] border-r border-gray-200 bg-white flex flex-col shrink-0 overflow-y-auto">
      <div className="p-5 border-b border-gray-100">
        <h2 className="font-semibold text-[0.95rem] text-gray-900 leading-none mb-1">Main Visualizer</h2>
        <span className="text-[13px] text-gray-500 font-medium">v2.4.0-stable</span>
        <button className="mt-5 w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-white text-[13px] text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm flex justify-center">
          New Run
        </button>
      </div>
      <nav className="p-3 space-y-0.5 flex-1 mt-2">
        <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <SidebarItem icon={<Layers size={18} />} label="Agent Fleet" />
        <SidebarItem icon={<History size={18} />} label="Run History" active />
        <SidebarItem icon={<Database size={18} />} label="Knowledge Base" />
        <SidebarItem icon={<Key size={18} />} label="API Keys" />
      </nav>
      <div className="p-3 border-t border-gray-100 space-y-0.5 mb-2">
        <SidebarItem icon={<Book size={18} />} label="Docs" />
        <SidebarItem icon={<Headphones size={18} />} label="Support" />
      </div>
    </aside>
  );
}
