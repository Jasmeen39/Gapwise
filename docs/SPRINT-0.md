# Sprint 0 — Development foundation

## Sprint goal

Make the repository understandable, runnable locally, and ready for small tested changes with Antigravity as an assistant.

## Backlog

- [ ] S0-1: Open the existing repository as an Antigravity workspace and verify it reads `AGENTS.md`.
- [ ] S0-2: Confirm the required local tools are installed: Go, Node.js/npm, Git, and Docker Desktop.
- [ ] S0-3: Start PostgreSQL with Docker Compose and wait for the health check to pass.
- [ ] S0-4: Run Go formatting check, tests, and `go vet`.
- [ ] S0-5: Start the API and verify `GET /health`.
- [ ] S0-6: Install frontend dependencies; run typecheck and production build.
- [ ] S0-7: Start Vite and verify the page reports the API as connected.
- [ ] S0-8: Inspect Git status, commit the verified Sprint 0 foundation, and confirm GitHub Actions is configured.

## Acceptance criteria

- The database reports healthy in `docker compose ps`.
- `GET http://localhost:8080/health` returns `{"status":"ok","service":"learning-gap-api"}` with HTTP 200.
- `http://localhost:5173` loads and its backend status is `Connected`.
- From `api/`, `go test ./...` and `go vet ./...` pass; Go files are formatted.
- From `web/`, `npm run typecheck` and `npm run build` pass.
- The repository contains no actual secrets, generated dependency folders, or build output.

## Out of scope

Sprint 0 does not implement database access from Go, authentication, questions, submissions, concept modeling, graph traversal, recommendations, AI, caching, cloud deployment, or microservices. Those belong to later sprints.

## Current validation note

The initial scaffold's Go tests have passed in the generation environment. Docker is unavailable in that environment, and the frontend dependency installation/build has not yet been verified there. Re-run the checks on the developer's machine and update this checklist only with observed results.
