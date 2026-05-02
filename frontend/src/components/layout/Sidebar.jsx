export default function Sidebar() {
  return (
    <div className="w-56 border-r bg-gray-50 p-4">
      <p className="font-semibold mb-4">Menu</p>
      <ul className="space-y-2 text-sm">
        <li className="text-blue-600">Run History</li>
        <li>Dashboard</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}