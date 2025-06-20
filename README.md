
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
│   ├── api-gateway/      # API Gateway (REST/GraphQL entrypoint)
│   ├── billpay/          # Bill payment microservice
│   ├── notification/     # Notification microservice
│   ├── payment/          # Payment microservice
│   ├── subscription/     # Subscription microservice
│   └── user-service/     # User management, todo, bank accounts, transactions

├── libs/
│   └── shared/         # Shared DTOs, interfaces, utilities
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
nest start api-gateway --watch
nest start payment --watch
nest start billpay --watch
nest start subscription --watch
nest start notification --watch
nest start user-service --watch
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

## 🚀 Running Services

To run a specific service in development mode, use the following commands. Once a service is running, its API documentation is typically available at `http://localhost:PORT/api`.

-   **API Gateway:**
    ```bash
    npm run start:dev api-gateway
    ```

-   **User Service:**
    ```bash
    npm run start:dev user-service
    ```

-   **Payment Service:**
    ```bash
    npm run start:dev payment
    ```

-   **Subscription Service:**
    ```bash
    npm run start:dev subscription
    ```

-   **Bill Pay Service:**
    ```bash
    npm run start:dev billpay
    ```

-   **Notification Service:**
    ```bash
    npm run start:dev notification
    ```

---

## 🗃️ Database Migrations

This project uses TypeORM to manage database schema changes.

-   **Generate a migration:**
    After making changes to any entity, create a new migration file.

    ```bash
    npm run migration:generate -- apps/user-service/src/migrations/YourMigrationName
    ```

-   **Run migrations:**
    Apply all pending migrations to the database.

    ```bash
    npm run migration:run
    ```

-   **Revert a migration:**
    Undo the last applied migration.
    ```bash
    npm run migration:revert
    ```

---

## 👨‍💻 Author

Lovely Sehotra
Full Stack Developer
🔗 [LinkedIn](https://www.linkedin.com/in/lovely-sehotra)

---

## 📄 License

MIT © 2025 Lovely Sehotra

