export default function OutputBlock({ outputs }) {
  return (
    <div className="bg-gray-50 p-2 rounded text-xs">
      {outputs.map((o, i) => (
        <div key={i}>{o.content}</div>
      ))}
    </div>
  );
}