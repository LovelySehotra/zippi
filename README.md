
````md
# 💸 Zippi– Fintech Payment Platform

A scalable App built using **NestJS Microservices**, **GraphQL**, **Redis**, and containerized with **Docker** and orchestrated via **Kubernetes**. This app supports payments, utility bill management, OTT subscriptions, and account integrations.

---

## 🚀 Features

- 🔐 User Authentication & Account Linking
- 💳 Payment Processing
- 🧾 Bill Payments (Electricity, Water, Mobile Recharge, Credit Card, Loan EMI)
- 🎬 OTT Platform Subscriptions
- 📡 Microservice Communication via Redis
- 🧩 GraphQL Gateway for Unified API
- 📦 Dockerized Services with Kubernetes Support

---

## 🏗️ Tech Stack

| Layer            | Technology              |
|------------------|--------------------------|
| Backend          | Node.js, NestJS (Monorepo) |
| API              | GraphQL (Apollo Gateway) |
| Communication    | Redis (Pub/Sub for microservices) |
| Containers       | Docker                   |
| Orchestration    | Kubernetes               |

---

## 📁 Folder Structure

```bash
.
├── apps/
│   ├── auth/           # Auth service
│   ├── payment/        # Payment service
│   ├── billing/        # Utility & EMI bills
│   ├── subscription/   # OTT subscriptions
│   └── gateway/        # GraphQL Gateway (API entrypoint)
├── libs/
│   └── common/         # Shared DTOs, decorators, GraphQL types
├── docker-compose.yml
├── k8s/                # Kubernetes manifests
├── .env                # Environment variables
└── README.md
````

---

## 🛠️ Getting Started

### Prerequisites

* Node.js v18+
* Docker & Docker Compose
* Redis (single instance)
* Nest CLI (`npm i -g @nestjs/cli`)

---

### 🚨 Install Dependencies

```bash
npm install
```

---

### ▶️ Run with Docker

```bash
docker-compose up --build
```

---

### ▶️ Run Locally (Dev)

```bash
# Start all services manually
nest start auth --watch
nest start payment --watch
nest start billing --watch
nest start subscription --watch
nest start gateway --watch
```

---

### 🌐 Access API Playground

```bash
http://localhost:3000/graphql
```

---

## 🧠 Redis Usage

* Single Redis instance for all microservices
* Used via `@nestjs/microservices` as transport layer
* Each service publishes/subscribes to relevant events (e.g. `user_created`, `bill_paid`)

---

## ☁️ Kubernetes Deployment

Manifests stored in `k8s/`:

* Deployment
* Service
* Redis setup
* ConfigMaps & Secrets

---

## 📚 Documentation

For detailed architecture, Redis transport, GraphQL gateway setup, and service-specific guides, check the [`docs/`](./docs/) folder.

---

## 👨‍💻 Author

Lovely Sehotra
Full Stack Developer
🔗 [LinkedIn](https://www.linkedin.com/in/lovely-sehotra)

---

## 📄 License

MIT © 2025 Lovely Sehotra

