# LaReact E-Commerce

A demo e-commerce application using **Laravel** (PHP) for the backend and **React** for the frontend (web and mobile).

## Project Structure

```
.
├── backend/                    # Laravel 13 API backend
│   ├── app/
│   │   ├── Http/Controllers/Api/  # API controllers
│   │   └── Models/                # Eloquent models
│   ├── database/
│   │   ├── factories/             # Model factories
│   │   ├── migrations/            # Database migrations
│   │   └── seeders/               # Database seeders
│   ├── routes/
│   │   ├── api.php                # API routes
│   │   └── web.php                # Web routes
│   ├── tests/
│   │   ├── Feature/               # Feature tests (PHPUnit)
│   │   └── Unit/                  # Unit tests (PHPUnit)
│   └── Dockerfile
├── frontend/
│   ├── web/                    # React + Vite web application
│   │   ├── src/
│   │   │   ├── __tests__/         # Unit tests (Vitest)
│   │   │   ├── components/        # React components
│   │   │   ├── pages/             # Page components
│   │   │   └── services/          # API service layer
│   │   └── Dockerfile
│   └── mobile/                 # React Native mobile application
│       ├── __tests__/             # Unit tests (Jest)
│       ├── src/
│       │   ├── components/
│       │   └── services/
│       └── App.tsx
├── tests/
│   └── acceptance/
│       ├── web/                # Cypress E2E acceptance tests
│       │   └── cypress/e2e/
│       └── mobile/             # Detox mobile acceptance tests
│           └── e2e/
├── docker-compose.yml          # Development environment (3 services)
└── .env.example
```

## Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- [Node.js](https://nodejs.org/) >= 20 (for frontend local development and tests)

## Quick Start

1. **Clone and start the development environment:**
   ```bash
   docker compose up --build
   ```

2. **Run database migrations and seed data:**
   ```bash
   docker exec lareact-backend php artisan migrate --force
   docker exec lareact-backend php artisan db:seed --force
   ```

3. **Access the applications:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api
   - Laravel Welcome: http://localhost:8000

## Docker Services

| Service | Container | Port | Description |
|---------|-----------|------|-------------|
| `web-backend` | `lareact-backend` | 8000 | Laravel API (PHP 8.4) |
| `web-frontend` | `lareact-frontend` | 5173 | React dev server (Vite) |
| `db` | `lareact-db` | 3306 | MySQL 8.0 |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List products (paginated) |
| GET | `/api/products/{id}` | Get single product |
| POST | `/api/products` | Create product |

## Running Tests

### Backend (Laravel / PHPUnit)
```bash
docker exec lareact-backend php artisan test
```

### Frontend Web (Vitest)
```bash
cd frontend/web && npm run test
```

### Frontend Mobile (Jest)
```bash
cd frontend/mobile && npm install && npm test
```

### Acceptance Tests - Web (Cypress)
```bash
cd tests/acceptance/web && npm install && npm run cy:run
```

### Acceptance Tests - Mobile (Detox)
Requires Android/iOS emulator. See `tests/acceptance/mobile/README.md`.

## Linting

### Backend (Laravel Pint)
```bash
docker exec lareact-backend ./vendor/bin/pint --test
```

### Frontend Web (ESLint + TypeScript)
```bash
cd frontend/web && npm run lint && npx tsc -b
```
