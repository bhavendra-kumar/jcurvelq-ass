export default function HeaderCard({ run, time }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold">{run.query}</h2>
      <p>Status: {run.status}</p>
      <p>Time: {time}s</p>
    </div>
  );
}