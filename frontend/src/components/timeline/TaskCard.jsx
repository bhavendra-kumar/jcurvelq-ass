export default function TaskCard({ task }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{task.label}</h3>
          <p className="text-xs text-gray-500">{task.agent}</p>
        </div>
        <span className="text-xs font-medium">{task.status}</span>
      </div>

      {/* Tool Calls */}
      {task.toolCalls.length > 0 && (
        <div className="mt-2 space-y-1">
          {task.toolCalls.map((t, i) => (
            <div key={i} className="bg-black text-green-400 p-2 rounded text-xs">
              call {t.tool}
            </div>
          ))}
        </div>
      )}

      {/* Outputs */}
      {task.outputs.length > 0 && (
        <div className="mt-2 text-sm space-y-1">
          {task.outputs.map((o, i) => (
            <p key={i}>{o.content}</p>
          ))}
        </div>
      )}
    </div>
  );
}