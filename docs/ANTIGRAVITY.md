# Using Antigravity with this project

## What Antigravity is

Antigravity is an AI-assisted development environment. In this project it can help explain code, suggest edits, run approved checks, and review changes. It does not replace our responsibility to understand and verify the code.

## Open the right folder

1. Extract the project ZIP to a stable location, for example `C:\Users\<you>\source\learning-gap-engine`.
2. Open Antigravity and open that existing `learning-gap-engine` folder as the workspace.
3. Confirm that `AGENTS.md`, `README.md`, `compose.yaml`, `api/`, and `web/` are visible in the file explorer.
4. Keep terminal command execution at **Request Review** (or the equivalent cautious setting) so you can inspect commands before allowing them. Do not enable unrestricted execution just to make setup faster.
5. Read this guide and `AGENTS.md` before asking the agent to edit code.

Antigravity's official documentation says workspace `AGENTS.md` and `GEMINI.md` files are discovered as project rules. The repository's `AGENTS.md` therefore carries our project scope and learning instructions with the code.

## First prompt to give Antigravity

Copy and paste the following into the Antigravity agent panel after opening the project folder:

> Read `AGENTS.md`, `README.md`, and `docs/DEVELOPMENT.md` first. We are doing Sprint 0 only. I am new to these concepts, so explain each unfamiliar term in simple English before relying on it. Inspect the current repository and report: (1) what already exists, (2) which Sprint 0 acceptance checks have actually been verified, (3) anything that appears broken or incomplete, and (4) the smallest next step. Do not edit files yet. Do not claim to have run a command unless you actually ran it. Wait for my response before making changes.

This first prompt is intentionally a review-only request. It lets us establish the real state of your local setup before an AI agent changes anything.

## How to work with the agent safely

- Ask for one small task at a time.
- Ask it to describe the intended change before editing.
- Approve terminal commands only after you understand what they do.
- After a change, ask which files changed and why.
- Check the diff, then run the appropriate test/check commands.
- If a test fails, share the exact error and fix it before moving on.
- Do not ask it to "finish the whole app" or implement future-sprint features.
- Do not accept code merely because the agent says it is correct; use test output as evidence.

## Suggested task format

For each task, give the agent:

- **Goal:** one visible outcome.
- **Scope:** which part of the project may change.
- **Acceptance criteria:** observable evidence that it works.
- **Checks:** exact commands to run.
- **Explain:** what new concepts and code mean in simple English.

## Sprint 0 local checks

Run these from the project root in PowerShell. Start Docker Desktop first.

```powershell
Copy-Item .env.example .env
docker compose up -d db
docker compose ps
```

Start the API in another terminal:

```powershell
Set-Location .\api
go test ./...
go vet ./...
go run ./cmd/server
```

Open `http://localhost:8080/health` and confirm it returns status `ok`.

Start the frontend in a third terminal:

```powershell
Set-Location .\web
npm install
npm run typecheck
npm run build
npm run dev
```

Open `http://localhost:5173` and confirm the backend connection says `Connected`.

Note: `docker compose up -d db` and frontend installation require Docker Desktop and access to the relevant package registries. If those are unavailable, capture the error; do not assume the step passed.
