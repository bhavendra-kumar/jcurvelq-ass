export default function TimelineNode({ children }) {
  return (
    <div className="flex gap-4">
      <div className="w-3 h-3 bg-gray-400 rounded-full mt-2"></div>
      <div className="flex-1">{children}</div>
    </div>
  );
}