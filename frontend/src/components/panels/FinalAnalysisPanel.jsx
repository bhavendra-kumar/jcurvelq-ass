export default function FinalAnalysisPanel({ output }) {
  if (!output) return null;

  return (
    <div className="bg-blue-50 p-6 rounded shadow">
      <h2 className="font-bold text-lg mb-2">Final Analysis</h2>
      <p>{output.summary}</p>
    </div>
  );
}