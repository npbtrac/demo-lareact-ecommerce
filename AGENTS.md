# AGENTS.md

## Cursor Cloud specific instructions

### Architecture Overview

This is a monorepo with a Laravel 13 (PHP 8.4) backend and React (TypeScript/Vite) web frontend, orchestrated via Docker Compose with 3 services: `web-backend`, `web-frontend`, and `db` (MySQL 8.0). There is also a React Native mobile scaffold under `frontend/mobile/`.

### Starting the Development Environment

```bash
# Start Docker daemon (required in Cloud Agent VMs)
sudo dockerd &>/tmp/dockerd.log &
sudo chmod 666 /var/run/docker.sock

# Start all services
cd /workspace && docker compose up -d --build

# Run migrations and seed (after db is healthy)
docker exec lareact-backend php artisan migrate --force
docker exec lareact-backend php artisan db:seed --force
```

**Gotcha:** The `db` service takes ~30s to become healthy on first start. The `web-backend` service depends on `db` health, so it will wait automatically when using `docker compose up`.

### Running Tests

- **Backend:** `docker exec lareact-backend php artisan test` (uses SQLite in-memory, no DB dependency)
- **Frontend web:** `cd frontend/web && npm run test` (Vitest, runs locally, no Docker needed)
- **Frontend mobile:** `cd frontend/mobile && npm test` (Jest, unit tests only; full mobile testing requires emulators)
- **Acceptance web:** `cd tests/acceptance/web && npm run cy:run` (Cypress; requires frontend running on :5173)

### Linting

- **Backend:** `docker exec lareact-backend ./vendor/bin/pint --test`
- **Frontend web:** `cd frontend/web && npm run lint` (ESLint) and `npx tsc -b` (TypeScript)

### Key Gotchas

- Docker must be started manually in Cloud Agent VMs (`sudo dockerd` + `sudo chmod 666 /var/run/docker.sock`). The VM environment needs `fuse-overlayfs` and `iptables-legacy` for nested Docker to work.
- The backend `.env` file has `DB_HOST=db` for Docker Compose networking. PHPUnit tests use SQLite in-memory (configured in `phpunit.xml`) and don't need MySQL.
- The frontend's `VITE_API_URL` defaults to `http://localhost:8000/api`. This works because the browser makes requests to the host-mapped port.
- When the backend container restarts, you may need to re-run `php artisan migrate` and `php artisan db:seed` if the MySQL data volume was cleared.
