

# AI Task Processing Platform — Implementation Plan

This is a large, multi-service project. Lovable can build the **React frontend with mock/simulated backend** directly in the editor. For the **backend, worker, Docker, Kubernetes, CI/CD, and architecture document**, I'll generate them as downloadable files since they cannot run inside Lovable.

## What gets built in Lovable (React Frontend)

1. **Auth pages** — Login and Register with form validation, JWT token storage, protected routes
2. **Dashboard/Task List page** — Table showing all tasks with status badges (pending/running/success/failed), auto-refresh simulation
3. **Create Task page/dialog** — Form with title, input text, operation selector (uppercase, lowercase, reverse, word count), "Run" button
4. **Task Detail page** — Shows task result, execution logs with timestamps, status history
5. **Layout** — Responsive navbar with auth state, clean modern UI using shadcn/ui components
6. **Mock API layer** — Simulated backend using localStorage + setTimeout to mimic async task processing (status transitions: pending → running → success/failed)

## What gets generated as downloadable files

7. **Backend (Node.js/Express)** — REST API with JWT auth, bcrypt, Helmet, rate limiting, Redis queue push, MongoDB models
8. **Python Worker** — Redis queue consumer, task processing, MongoDB updates
9. **Docker** — Multi-stage Dockerfiles for frontend, backend, worker + docker-compose.yml
10. **Kubernetes manifests** — Namespace, deployments, services, ingress, configmaps, secrets, resource limits, probes
11. **Argo CD config** — Application YAML for GitOps sync
12. **CI/CD pipeline** — GitHub Actions workflow
13. **Architecture Document** — PDF covering scaling, 100k tasks/day, indexing, Redis failure handling, staging/prod strategy
14. **README** — Setup and deployment instructions

## Technical Approach

- Frontend uses React Router for pages, React Query patterns for data fetching (mock), Zustand or context for auth state
- Mock API service can be swapped for real API by changing base URL
- All generated backend/infra files follow the exact assignment requirements
- Architecture document will be 3-4 pages covering all required topics

## File Structure (Frontend in Lovable)
```
src/
  components/
    Layout.tsx, Navbar.tsx, ProtectedRoute.tsx
    TaskCard.tsx, TaskStatusBadge.tsx, CreateTaskDialog.tsx
  pages/
    Index.tsx, Login.tsx, Register.tsx, Dashboard.tsx, TaskDetail.tsx
  services/
    mockApi.ts (localStorage-based simulation)
    auth.ts
  types/
    index.ts (Task, User, Operation types)
  contexts/
    AuthContext.tsx
```

## Downloadable Files (generated to /mnt/documents/)
```
/mnt/documents/
  backend/          — Express server code
  worker/           — Python worker code
  docker/           — Dockerfiles + docker-compose.yml
  k8s/              — All Kubernetes manifests
  argocd/           — Application YAML
  .github/          — CI/CD workflows
  architecture.pdf  — Architecture document
  README.md         — Full setup instructions
```

