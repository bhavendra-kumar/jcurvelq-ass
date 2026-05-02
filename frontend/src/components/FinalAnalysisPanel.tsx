import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Copy, Download, Link2 } from 'lucide-react';

export function FinalAnalysisPanel({ finalOutput, citations }: { finalOutput: string | null; citations?: { id: string; title: string, url: string }[] }) {
  if (!finalOutput) {
    return (
      <div className="bg-gradient-to-br from-[#eff3fe] to-white border border-blue-100 rounded-[1.5rem] p-8 shadow-[0_4px_24px_-8px_rgba(37,99,235,0.08)] sticky top-6">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-3 text-blue-900/50">
            <Sparkles size={28} className="text-blue-400" />
            <h2 className="text-[1.7rem] font-bold tracking-tight">Final Analysis</h2>
          </div>
        </div>
        <div className="space-y-4 mb-8">
          <div className="h-3.5 bg-blue-100/60 rounded-full w-[85%] animate-pulse"></div>
          <div className="h-3.5 bg-blue-100/60 rounded-full w-full animate-pulse"></div>
          <div className="h-3.5 bg-blue-100/60 rounded-full w-[90%] animate-pulse"></div>
          <div className="h-3.5 bg-blue-100/60 rounded-full w-[70%] animate-pulse"></div>
        </div>
      </div>
    );
  }

  const lines = finalOutput.split('\n').filter(l => l.trim().length > 0);
  const paragraphs = lines.filter(l => !l.trim().startsWith('*')).join(' ');
  const bullets = lines.filter(l => l.trim().startsWith('*')).map(l => l.replace(/^\*\s*/, ''));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-[#eff3fe] to-white border border-blue-100 rounded-[1.5rem] p-8 shadow-[0_4px_24px_-8px_rgba(37,99,235,0.08)] sticky top-6"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-3 text-blue-900">
          <Sparkles size={28} className="text-blue-600" />
          <h2 className="text-[1.7rem] font-bold tracking-tight">Final Analysis</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-white border border-blue-100 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors shadow-sm">
            <Copy size={18} />
          </button>
          <button className="p-2 bg-white border border-blue-100 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors shadow-sm">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="prose prose-sm text-gray-700 leading-[1.7]">
        <p className="mb-5">{paragraphs}</p>
        {bullets.length > 0 && (
          <ul className="space-y-3 list-disc pl-5 marker:text-gray-400">
            {bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
      </div>

      {citations && citations.length > 0 && (
        <div className="mt-10">
          <h4 className="text-[11px] font-bold text-blue-800 tracking-widest uppercase mb-4">Citations & Sources</h4>
          <div className="flex flex-wrap gap-2.5">
            {citations.map(c => (
              <a key={c.id} href={c.url} className="inline-flex items-center gap-2 px-3 py-1.5 border border-blue-200/60 bg-white rounded-lg text-xs font-medium text-blue-700 hover:bg-blue-50 transition-colors shadow-sm">
                <Link2 size={14} className="text-blue-500" />
                [{c.id}] {c.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
