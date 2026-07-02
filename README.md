# TaskFlow — Authentication + Task Management

> Simple auth-backed task management API with a Vite + React frontend.

This repository contains a Node.js/Express backend and a Vite React frontend (`taskflow-frontend`) demonstrating user authentication, JWT sessions, and basic task CRUD operations.

**Highlights**
- JWT-based authentication and protected routes
- MongoDB via `mongoose` for persistence
- Separate frontend (`taskflow-frontend`) built with Vite + React
- Development scripts for fast iteration

**Tech stack**
- Backend: Node.js, Express, Mongoose, JSON Web Tokens
- Frontend: React (Vite)

**Repository layout**
- `app.js` — backend entry point
- `routes/`, `controllers/`, `models/`, `middleware/` — backend code
- `taskflow-frontend/` — frontend app (Vite + React)

Getting started
---------------

Prerequisites
- Node.js (recommended 18+; this project was built and tested with Node 22.x)
- npm (bundled with Node)
- A running MongoDB instance (Atlas or local)

1) Clone the repo (if you haven't already):

```bash
git clone https://github.com/vanshikasingla419/TaskFlow.git
cd "auth system"
```

2) Create a `.env` file at the repository root (do NOT commit it). Example `.env`:

```env
# Backend
PORT=4000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here

# Optional
FRONTEND_URL=http://localhost:5173
```

3) Install dependencies

Backend:
```powershell
npm install
```

Frontend:
```powershell
cd taskflow-frontend
npm install
cd ..
```

4) Run in development

Start backend (nodemon watches changes):
```powershell
npm run dev
```

Start frontend (Vite):
```powershell
cd taskflow-frontend
npm run dev
```

5) Build for production (frontend)

```powershell
cd taskflow-frontend
npm run build
```

Security & Git
---------------
- Do not commit secrets or `.env`. This repo already includes a `.gitignore` and `.gitattributes` to help avoid committing `node_modules` and normalize line endings.
- If you accidentally commit secrets, rotate the leaked credentials immediately and remove them from history using a history-rewrite tool (BFG or `git filter-repo`).

Environment Variables
---------------------
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWT tokens
- `PORT` — backend port (default: 4000)
- `FRONTEND_URL` — allowlist/origin for CORS if used

Project Notes
-------------
- Backend endpoints live in `routes/` and are implemented with controllers in `controllers/`.
- Protected routes use the middleware in `middleware/authMiddleware.js`.
- Frontend API calls are centralized in `taskflow-frontend/src/services/api.js`.

Contributing
------------
Contributions are welcome. Open an issue or submit a pull request. Please avoid committing credentials or large dependency folders like `node_modules`.

License
-------
MIT — see the `LICENSE` file if present.

Contact
-------
If you need help with setup or want me to add CI/README badges, tell me what to add and I'll update the README.
