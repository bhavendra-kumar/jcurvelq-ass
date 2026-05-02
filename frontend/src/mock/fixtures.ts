export type EventType = 
  | 'run_started' 
  | 'task_spawned' 
  | 'task_update' 
  | 'tool_call' 
  | 'tool_result' 
  | 'partial_output' 
  | 'run_complete' 
  | 'run_error';

export interface AppEvent {
  type: EventType;
  delay: number;
  payload: any;
}

export const runSuccessEvents: AppEvent[] = [
  { type: 'run_started', delay: 800, payload: { query: 'Analyze recent market trends in generative AI' } },
  { type: 'task_spawned', delay: 800, payload: { id: 't_001', label: 'Researching Competitors', agent: 'SearchAgent', icon: 'Search' } },
  { type: 'task_update', delay: 100, payload: { id: 't_001', status: 'running', statusLabel: 'Running' } },
  { type: 'tool_call', delay: 1200, payload: { taskId: 't_001', callId: 'call_1', command: 'google_search("top gen ai startups 2024")' } },
  { type: 'tool_result', delay: 1500, payload: { taskId: 't_001', callId: 'call_1', result: '42 results found', duration: '0.8s' } },
  { type: 'task_update', delay: 800, payload: { id: 't_001', status: 'complete', statusLabel: 'Complete' } },
  
  // Parallel group 1
  { type: 'task_spawned', delay: 800, payload: { id: 't_002', label: 'Sentiment Analysis', agent: 'SentimentBot', icon: 'MessageSquare', parallelGroup: 'pg_1' } },
  { type: 'task_spawned', delay: 200, payload: { id: 't_003', label: 'Tech Stack Audit', agent: 'CodeAnalyzer', icon: 'Code', parallelGroup: 'pg_1' } },
  { type: 'task_spawned', delay: 200, payload: { id: 't_004', label: 'Data Synthesis', agent: 'Summarizer', icon: 'FileText', parallelGroup: 'pg_1' } },
  
  { type: 'task_update', delay: 800, payload: { id: 't_002', status: 'running', statusLabel: 'Analyzing...' } },
  { type: 'partial_output', delay: 500, payload: { taskId: 't_002', outputId: 'out_1', text: 'Analyzing twitter stream...', isStreaming: true } },
  { type: 'task_update', delay: 400, payload: { id: 't_003', status: 'running', statusLabel: 'Auditing...' } },
  
  { type: 'task_update', delay: 1000, payload: { id: 't_004', status: 'failed', statusLabel: 'Failed - Retrying...' } },
  { type: 'partial_output', delay: 100, payload: { taskId: 't_004', outputId: 'out_2', text: 'Connection timeout on API endpoint. Attempt 2/3.', isStreaming: false, isError: true } },
  
  { type: 'partial_output', delay: 1800, payload: { taskId: 't_002', outputId: 'out_1', text: 'Positive sentiment identified (84%)', isStreaming: false } },
  { type: 'task_update', delay: 500, payload: { id: 't_002', status: 'complete', statusLabel: 'Complete' } },
  
  { type: 'task_update', delay: 500, payload: { id: 't_003', status: 'running', statusLabel: 'Cloning repos...' } },
  { type: 'task_update', delay: 1200, payload: { id: 't_003', status: 'complete', statusLabel: 'Complete' } },
  
  { type: 'task_update', delay: 1000, payload: { id: 't_004', status: 'running', statusLabel: 'Retrying...' } },
  { type: 'task_update', delay: 1500, payload: { id: 't_004', status: 'cancelled', statusLabel: 'Cancelled' } },
  { type: 'partial_output', delay: 100, payload: { taskId: 't_004', outputId: 'out_3', text: 'Stopped early (sufficient data).', isStreaming: false, isCancelled: true } },

  // Final Output Optional Node
  { type: 'task_spawned', delay: 800, payload: { id: 't_005', label: 'Optional Enrichment', agent: 'DataBot', icon: 'Database' } },
  { type: 'task_update', delay: 500, payload: { id: 't_005', status: 'cancelled', statusLabel: 'Cancelled' } },
  { type: 'partial_output', delay: 100, payload: { taskId: 't_005', outputId: 'out_4', text: 'Stopped early (sufficient data).', isStreaming: false, isCancelled: true } },

  { type: 'run_complete', delay: 1500, payload: {
    finalOutput: `Based on the initial data gathered, the generative AI market is seeing significant consolidation in the foundational model space, while application-layer startups are fragmenting into hyper-niche verticals.
    
* Enterprise adoption is shifting from 'exploration' to 'production', increasing demand for robust evaluation frameworks.
* Open-source models are narrowing the performance gap with proprietary models, driving down API costs across the board.`,
    citations: [
      { id: '1', title: 'TechCrunch: Q3 AI Funding Report', url: '#' },
      { id: '2', title: 'GitHub State of Octoverse', url: '#' }
    ]
  }}
];

export const runErrorEvents: AppEvent[] = [
  { type: 'run_started', delay: 800, payload: { query: 'Analyze recent market trends in generative AI' } },
  { type: 'task_spawned', delay: 800, payload: { id: 't_001', label: 'Researching Competitors', agent: 'SearchAgent', icon: 'Search' } },
  { type: 'task_update', delay: 100, payload: { id: 't_001', status: 'running', statusLabel: 'Running' } },
  { type: 'tool_call', delay: 1200, payload: { taskId: 't_001', callId: 'call_1', command: 'google_search("top gen ai startups 2024")' } },
  { type: 'tool_result', delay: 1500, payload: { taskId: 't_001', callId: 'call_1', result: '42 results found', duration: '0.8s' } },
  { type: 'task_update', delay: 800, payload: { id: 't_001', status: 'complete', statusLabel: 'Complete' } },
  
  // Parallel group 1
  { type: 'task_spawned', delay: 800, payload: { id: 't_002', label: 'Sentiment Analysis', agent: 'SentimentBot', icon: 'MessageSquare', parallelGroup: 'pg_1' } },
  { type: 'task_ spawned', delay: 200, payload: { id: 't_003', label: 'Tech Stack Audit', agent: 'CodeAnalyzer', icon: 'Code', parallelGroup: 'pg_1' } },
  
  { type: 'task_update', delay: 800, payload: { id: 't_002', status: 'running', statusLabel: 'Analyzing...' } },
  { type: 'partial_output', delay: 500, payload: { taskId: 't_002', outputId: 'out_1', text: 'Analyzing twitter stream...', isStreaming: true } },
  
  { type: 'task_update', delay: 1500, payload: { id: 't_003', status: 'failed', statusLabel: 'Failed' } },
  { type: 'partial_output', delay: 100, payload: { taskId: 't_003', outputId: 'out_2', text: 'API limit exceeded. Aborting.', isStreaming: false, isError: true } },
  
  { type: 'run_error', delay: 1000, payload: { errorMsg: 'Run failed due to API limits.' } }
];
