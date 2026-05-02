import React from 'react';

export function TimelineNode({ 
  icon, 
  variant = 'default',
  isLast = false,
  children 
}: { 
  icon: React.ReactNode; 
  variant?: 'success' | 'running' | 'error' | 'cancelled' | 'default';
  isLast?: boolean;
  children: React.ReactNode;
}) {
  const variantStyles = {
    success: 'border-green-200 text-green-500 bg-green-50 ring-4 ring-[#f8fafc]',
    running: 'border-blue-500 bg-blue-500 text-white shadow-md ring-4 ring-[#f8fafc]',
    error: 'border-red-200 text-red-500 bg-red-50 ring-4 ring-[#f8fafc]',
    cancelled: 'border-gray-300 text-gray-400 bg-gray-100 ring-4 ring-[#f8fafc]',
    default: 'border-gray-200 text-gray-400 bg-white ring-4 ring-[#f8fafc]'
  };

  return (
    <div className="flex gap-6 relative">
      {/* Timeline Axis */}
      <div className="flex flex-col items-center w-8 shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border ${variantStyles[variant]}`}>
          {icon}
        </div>
        {!isLast && <div className="w-[1.5px] bg-gray-200 flex-1 my-1"></div>}
      </div>
      {/* Content */}
      <div className="flex-1 pb-10">
        {children}
      </div>
    </div>
  );
}
