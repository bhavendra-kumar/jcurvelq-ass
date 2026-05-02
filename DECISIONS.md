# DECISIONS.md

## 1. Agent Thoughts Visibility

**Decision:**
Agent thoughts are displayed as subtle, low-emphasis text within the task timeline (italic, muted color). They are not always visible by default and can be optionally expanded in a real system.

**Why:**
The primary user of this UI is a non-technical analyst. Constantly showing internal reasoning (agent thoughts) would create noise and reduce clarity. By keeping them visually de-emphasized, the UI maintains focus on actionable outputs while still preserving transparency.

**Reconsideration Signal:**
If users (especially analysts) request more transparency or debugging insight, I would introduce a toggle to fully expand agent thoughts or display them in a separate debug panel.

---

## 2. Parallel Task Layout

**Decision:**
Parallel tasks are grouped visually within the timeline under a labeled section (e.g., "Parallel Execution") and styled with a shared visual boundary.

**Why:**
A standard vertical list can incorrectly imply sequential execution. Grouping tasks makes it clear that they were executed concurrently, improving mental modeling of the system's behavior.

**Reconsideration Signal:**
If the number of parallel tasks increases significantly or becomes more complex, I would explore a horizontal branching layout or graph-based visualization instead of a grouped list.

---

## 3. Partial Outputs Handling

**Decision:**
Partial outputs (`is_final: false`) are displayed incrementally in the UI as streaming log-like entries, rather than being replaced by the final output.

**Why:**
Streaming outputs give the user a sense of progress and make the system feel active and transparent. Removing intermediate outputs would reduce trust and visibility into how the result was generated.

**Reconsideration Signal:**
If users find the interface too noisy, I would collapse intermediate outputs into a summarized log or allow toggling between "live logs" and "final-only view".

---

## 4. Cancelled Task Representation

**Decision:**
Cancelled tasks are styled in a neutral gray tone with reduced opacity and include a message like "Stopped early (sufficient data)". They are explicitly not shown as errors.

**Why:**
A cancelled task is not a failure—it is an intentional optimization decision made by the system. Representing it as an error would mislead users and reduce trust in the system.

**Reconsideration Signal:**
If users misinterpret cancelled tasks or ignore them entirely, I would enhance the explanation with tooltips or contextual messaging.

---

## 5. Task Dependency Handling

**Decision:**
Task dependencies (`depends_on`) are handled implicitly through ordering and execution flow rather than explicit visual graph connections.

**Why:**
Displaying a full dependency graph would add significant visual complexity and cognitive load. Instead, the UI ensures tasks appear in a logically consistent order that reflects dependencies without overwhelming the user.

**Reconsideration Signal:**
If tasks become more interdependent or users require deeper understanding of execution flow, I would introduce an optional dependency visualization (e.g., DAG view or expandable graph).

---

## 6. Final Output Emphasis

**Decision:**
The final output is displayed in a separate, visually dominant panel with distinct styling (larger size, gradient background, and clear heading).

**Why:**
The primary goal of the user is to obtain the final insight. The UI ensures that this output is immediately visible and not buried within the task timeline.

**Reconsideration Signal:**
If users prefer a more integrated experience, I would experiment with inline synthesis or progressive summarization during the run.

---

## 7. Failure and Retry Handling

**Decision:**
Failures are displayed with a clear but non-alarming visual style, and retry transitions are shown explicitly (e.g., "Failed → Retrying").

**Why:**
Failures are part of a resilient system and should not appear catastrophic. Showing recovery improves user confidence in the system's robustness.

**Reconsideration Signal:**
If failures become frequent or critical, I would differentiate between recoverable and unrecoverable errors more clearly.

---

## 8. Real-Time Event Simulation

**Decision:**
A mock event emitter using timed delays (`setTimeout`) is used to simulate real-time system behavior.

**Why:**
This approach allows realistic UI behavior (progressive updates, streaming outputs) without requiring a backend. It also demonstrates how the UI would behave with live data.

**Reconsideration Signal:**
In a production environment, this would be replaced with WebSocket or server-sent events (SSE) for true real-time updates.

---

## Summary

The overall design prioritizes:

* Clarity over complexity
* Trust through transparency
* Real-time feedback
* Strong information hierarchy

The goal was to make a complex multi-agent system understandable to a non-technical user while preserving enough detail for confidence and traceability.
