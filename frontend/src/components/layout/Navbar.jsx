export default function Navbar() {
  return (
    <div className="h-14 border-b px-6 flex items-center justify-between bg-white">
      <h1 className="font-bold text-lg">AgentFlow</h1>
      <button className="bg-blue-600 text-white px-4 py-1 rounded">
        Deploy
      </button>
    </div>
  );
}