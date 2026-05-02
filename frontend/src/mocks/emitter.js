export function startMockRun(emit) {
  const events = [
    { type: "run_started", query: "Analyze AI market trends" },

    { type: "task_spawned", task_id: "t1", label: "Fetch Data", agent: "Fetcher" },

    { type: "tool_call", task_id: "t1", tool: "api_call" },

    { type: "partial_output", task_id: "t1", content: "Fetching data...", is_final: false },

    { type: "task_update", task_id: "t1", status: "complete" },

    { type: "run_complete", output: { summary: "AI market is growing rapidly." } },
  ];

  events.forEach((event, index) => {
    setTimeout(() => emit(event), index * 1000);
  });
}