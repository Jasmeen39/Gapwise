# Gapwise

An explainable learning gap detection and personalized practice recommendation engine.

Gapwise analyzes a learner's DSA practice history and concept prerequisites to identify likely learning gaps, uncover prerequisite weaknesses, and recommend what to practice next.

## Current Milestone: Sprint 0

This starter establishes the development foundation:

- React + TypeScript + Vite frontend
- Go HTTP API with `GET /health`
- PostgreSQL development database managed by Docker Compose
- Go unit tests and frontend typecheck/build in GitHub Actions

The API does **not** use PostgreSQL yet. Database-backed concepts arrive in Sprint 1.

## Recommended Development Environment: Antigravity

We use Antigravity as an AI-assisted editor, not as a replacement for understanding or testing the code.

Open the existing `learning-gap-engine` folder as the workspace; do not ask Antigravity to regenerate the project in a separate location.

The repository includes `AGENTS.md`, which gives Antigravity persistent project instructions. Antigravity discovers workspace `AGENTS.md`/`GEMINI.md` rule files automatically.

Read [docs/ANTIGRAVITY.md](docs/ANTIGRAVITY.md) for the recommended setup and the first prompt to use with the agent.

## Prerequisites

On Windows, use PowerShell and install:

- Node.js 22 or newer (npm is included)
- Go 1.23 or newer
- Docker Desktop with Docker Compose
- Git

## Run Locally (Windows / PowerShell)

Run these commands from the extracted `learning-gap-engine` folder unless a step says otherwise.

### 1. Configure and Start PostgreSQL

Make sure Docker Desktop is running, then run:

```powershell
Copy-Item .env.example .env
docker compose up -d db
docker compose ps
```

Wait until the `db` service reports `healthy`.

The values in `.env.example` are only for local development. Do not reuse the example password in a shared or exposed environment.

### 2. Start the Go API

Open a **second terminal** at the project root:

```powershell
Set-Location .\api
go test ./...
go vet ./...
go run ./cmd/server
```

Keep this terminal open.

The API listens at `http://localhost:8080` by default.

Open [http://localhost:8080/health](http://localhost:8080/health).

Expected JSON:

```json
{"status":"ok","service":"gapwise-api"}
```

### 3. Start the Frontend

Open a **third terminal** at the project root:

```powershell
Set-Location .\web
npm install
npm run dev
```

The first `npm install` needs access to the npm package registry and creates `web/package-lock.json`.

The API URL defaults to `http://localhost:8080`.

To change it, copy `web/.env.example` to `web/.env` and edit `VITE_API_BASE_URL`.

Open [http://localhost:5173](http://localhost:5173).

The backend connection card should report **Connected**.

Click **Check again** to retry the health request.

## Environment Settings

- Root `.env`: read by Docker Compose for PostgreSQL settings.
- `API_PORT`: Go API port (default `8080`); set it in the shell before starting Go if you need to override it.
- `CORS_ALLOWED_ORIGIN`: allowed frontend origin (default `http://localhost:5173`).
- `web/.env`: Vite frontend settings, including `VITE_API_BASE_URL`.

PowerShell override example, run from the project root in the API terminal:

```powershell
$env:API_PORT = "8080"
$env:CORS_ALLOWED_ORIGIN = "http://localhost:5173"
Set-Location .\api
go run ./cmd/server
```

## Useful Checks

From `api/`:

```powershell
gofmt -w .\cmd\server\main.go .\internal\httpapi\handler.go .\internal\httpapi\handler_test.go
go test ./...
go vet ./...
```

From `web/`:

```powershell
npm run typecheck
npm run build
```

## Repository Map

```text
.
├── .github/workflows/ci.yml  # Automated Go and frontend checks
├── AGENTS.md                 # Persistent instructions for Antigravity
├── api/
│   ├── cmd/server/           # API entry point
│   └── internal/httpapi/     # HTTP routes and tests
├── docs/                     # Development workflow and Antigravity notes
├── web/
│   └── src/                  # React application
├── .env.example
└── compose.yaml               # Local PostgreSQL service
```

## Sprint 0 Exit Criteria

- [ ] PostgreSQL starts and becomes healthy through Docker Compose.
- [x] Go API starts and `GET /health` returns the expected JSON (smoke-tested in the generation environment).
- [ ] Frontend dependencies install, frontend loads, and the API connection status is visible.
- [x] Go tests and `go vet` pass (tested in the generation environment).
- [ ] Frontend typecheck and build pass on the development machine.
- [ ] CI runs checks successfully on pushes and pull requests.

## Environment Note

Docker was not available and npm registry access timed out in the generation environment, so PostgreSQL startup and the frontend build have not yet been verified here.

Finish those checks locally.

After `npm install` creates `web/package-lock.json`, commit it; then switch CI's install step to `npm ci` and enable npm caching for more reproducible installs.

## Development Principle

Build small vertical slices, test them, and keep the main branch working.

Sprint 1 will add the concept model and prerequisite graph; we are not trying to design the entire system in advance.
