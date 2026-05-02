# Agent Run Panel

## Overview

This project implements an **Agent Run Panel**, a UI component that visualizes how a multi-agent AI system processes a research query in real time.

Instead of showing only the final answer, the interface makes the entire execution process transparent — including task creation, tool usage, intermediate outputs, retries, and final synthesis.

---

## Live Demo

🔗 Live URL: https://aiagentwork.netlify.app/

---

## Features

* **Real-time simulation** of agent execution using a mock event stream
* **Task timeline visualization** with clear status transitions
* **Parallel task grouping** for concurrent execution
* **Streaming outputs** to reflect intermediate progress
* **Failure and retry handling** with clear state transitions
* **Neutral cancellation states** to indicate optimization decisions
* **Prominent final output panel** for quick insight consumption

---

## Tech Stack

* React (Vite)
* Tailwind CSS
* Custom hooks for state and event handling

---

## Project Structure

```bash
src/
 ├── components/
 │   ├── layout/
 │   ├── timeline/
 │   ├── panels/
 │   └── common/
 ├── hooks/
 ├── mock/
 └── utils/
```

---



