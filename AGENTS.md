# Gapwise — Agent Instructions

These instructions apply to Antigravity and any other AI coding assistant working in this repository.

## Project Goal

Build Gapwise, a learning system that uses DSA question attempts and a prerequisite concept graph to estimate likely learning gaps and make explainable recommendations.

The goal is a tested, understandable engineering project—not a large collection of features.

## Teach While Building

- The developer is learning these tools and system-design concepts for the first time.
- Before relying on a new technical term or concept, explain it in plain English and give a small example.
- For each task, explain the goal, why it matters, the files that will change, and how the result will be verified.
- Do not dump a large unexplained code change. Prefer small steps, and explain non-obvious code after implementing it.
- If a command fails, explain what the error means and propose the smallest useful diagnostic next step.
- Prefer readable, beginner-friendly code over clever abstractions.
- Explain important design decisions and trade-offs without overwhelming the developer.

## Agile Working Rules

- Work only on the current sprint and its acceptance criteria. Do not implement later-sprint features without explicit approval.
- Before editing, inspect relevant files and summarize a short plan.
- Prefer a small, end-to-end increment over broad rewrites.
- Do not replace or regenerate the stack or project structure without discussing a concrete reason first.
- Keep `README.md` and relevant sprint notes accurate when setup instructions or behavior change.
- Update tests for behavior changes. Run the relevant checks after editing and report the exact commands and outcomes.
- Never claim a test, build, database startup, or deployment succeeded unless it actually ran successfully.
- If a check cannot run because a tool is missing or the network is unavailable, state that clearly and provide the local command to run.
- Finish one task before starting another. Do not introduce unrelated improvements or additional features.

## Architecture Boundaries for Sprint 0

- Frontend: React + TypeScript + Vite.
- Backend: Go standard-library HTTP server for now.
- Database: PostgreSQL, run locally through Docker Compose. Sprint 0 does not connect the API to the database yet.
- API style: HTTP/REST.
- CI: GitHub Actions.
- Keep the backend as a modular monolith; do not introduce microservices.
- No AI/LLM, Redis, Neo4j, Kubernetes, gRPC, user authentication, question system, or recommendation logic in Sprint 0.

## Safety and Change Control

- Never expose, print, commit, or overwrite secrets. Use `.env.example` for placeholders and keep real `.env` files untracked.
- Do not run destructive shell/database commands, install global tools, deploy resources, or incur cloud costs without asking first.
- Review diffs before committing. Do not create commits or push changes unless explicitly requested.
- Preserve unrelated work. Do not delete files merely because they appear unused without checking their purpose.
- Do not modify files outside the current task's scope without explaining why and obtaining approval when necessary.

## Token and Context Efficiency

- Keep responses concise, structured, and focused on the current task.
- Avoid repeating project context already documented in this file or `README.md`.
- Do not provide long prompts, explanations, or code dumps when a smaller explanation is sufficient.
- Inspect existing code before proposing changes; do not assume implementation details.
- Ask only essential clarification questions. If a safe, documented assumption is sufficient, state it and proceed.
- Do not start multiple unrelated tasks in one interaction.

## Sprint 0 Definition of Done

1. PostgreSQL starts and reports healthy with Docker Compose.
2. The Go API serves `GET /health` with the documented JSON response.
3. The React page loads and shows the backend connection state.
4. Go tests, `go vet`, frontend typecheck, and frontend production build pass.
5. Setup steps are documented and CI is configured to run the checks.

## Development Principle

Build small vertical slices, test them, and keep the main branch working.

Sprint 1 will introduce the concept model and prerequisite graph. Do not implement future functionality prematurely.