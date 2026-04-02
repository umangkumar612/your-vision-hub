# 🚀 AI Task Processing Platform (MERN + Python + Kubernetes)

A **production-ready AI Task Processing Platform** built using the MERN stack, Python worker, Redis queue, Docker, Kubernetes, and Argo CD (GitOps).
This project demonstrates **asynchronous task execution, scalability, DevOps, and system design**.

---

## 📌 Features

* 🔐 User Authentication (JWT + bcrypt)
* 🧠 AI Task Processing (uppercase, lowercase, reverse, word count)
* ⚡ Asynchronous processing using Redis Queue
* 📊 Task status tracking (pending, running, success, failed)
* 📝 Execution logs & results
* 🐳 Dockerized microservices
* ☸️ Kubernetes deployment
* 🔁 GitOps using Argo CD
* 🚀 CI/CD pipeline

---

## 🏗️ Tech Stack

**Frontend:** React / Next.js
**Backend:** Node.js + Express
**Worker:** Python
**Database:** MongoDB
**Queue:** Redis
**DevOps:** Docker, Kubernetes (k3s), Argo CD, CI/CD

---

## 📂 Project Structure

```
project-root/
│
├── frontend/          # React / Next.js app
├── backend/           # Node.js API (Express)
├── worker/            # Python worker (queue processor)
├── infra/             # Kubernetes manifests (separate repo recommended)
├── docker-compose.yml
└── README.md
```

---

## ⚙️ How It Works

1. User logs in and creates a task
2. Task is stored in MongoDB with **status = pending**
3. Task is pushed to **Redis queue**
4. Python worker picks task → updates status to **running**
5. Worker processes task → saves result & logs
6. Final status → **success / failed**

---

## 🖥️ Local Setup (Docker Compose)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ai-task-platform.git
cd ai-task-platform
```

---

### 2️⃣ Create Environment Variables

Create `.env` file in backend:

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/ai-tasks
JWT_SECRET=your_secret_key
REDIS_HOST=redis
REDIS_PORT=6379
```

---

### 3️⃣ Run with Docker

```bash
docker-compose up --build
```

---

### 4️⃣ Access Application

* Frontend → http://localhost:3000
* Backend → http://localhost:5000

---

## 🐳 Docker Setup

Each service has its own Dockerfile:

* Frontend (React/Next.js)
* Backend (Node.js)
* Worker (Python)

Features:

* Multi-stage builds
* Lightweight images
* Non-root user for security

---

## ☸️ Kubernetes Deployment

### Requirements

* Kubernetes cluster (Minikube / k3s)
* kubectl installed

### Steps

```bash
kubectl create namespace ai-platform

kubectl apply -f k8s/
```

---

### Includes:

* Deployments (frontend, backend, worker, Redis, MongoDB)
* Services
* Ingress
* ConfigMaps & Secrets
* Resource limits
* Liveness & Readiness probes

---

## 🔁 GitOps with Argo CD

* Kubernetes manifests stored in **infra repository**
* Argo CD syncs automatically with Git
* Any change → auto deployment

### Setup Argo CD

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Access dashboard and connect repo.

---

## 🚀 CI/CD Pipeline

Pipeline includes:

* ✅ Lint checks
* ✅ Docker image build
* ✅ Push to Docker Hub
* ✅ Update image tags in infra repo
* ✅ Auto deploy via Argo CD

---

## 🔐 Security

* Password hashing with bcrypt
* JWT authentication
* Helmet middleware
* Rate limiting
* Secrets managed via environment variables

---

## ⚡ Scalability

* Worker service can scale horizontally
* Redis handles traffic spikes
* Kubernetes auto-scaling support
* Designed for **100k+ tasks/day**

---

## ⚠️ Failure Handling

* Worker retry mechanism
* Redis fallback strategies
* Kubernetes auto-restart pods
* Logs for debugging

---

## 🗄️ Database Optimization

* Indexed fields: userId, status
* Efficient query handling
* Optimized for large datasets

---

## 🌍 Environments

* **Staging** → Testing
* **Production** → Live deployment

Separate configs for both environments.

---

## 📸 Screenshots

* UI Dashboard
* Task Logs
* Argo CD Dashboard

(Add images here)

---

## 📄 Architecture Document

Include:

* Worker scaling strategy
* High load handling
* Redis failure handling
* DB indexing
* Deployment strategy

---

## 📦 Submission Checklist

* ✅ Application repository
* ✅ Infrastructure repository
* ✅ Live deployed URL
* ✅ Argo CD screenshot
* ✅ Architecture document
* ✅ README

---

## 🙌 Author

**Umang Kumar**
Final Year CSE | MERN Developer

---

## ⭐ Final Note

This project demonstrates:

* Real-world system design
* Asynchronous processing
* DevOps & cloud deployment
* Production-ready architecture

---
