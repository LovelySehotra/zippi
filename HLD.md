# Google Pay Clone - High Level Design (HLD)

## Overview

Google Pay Clone is a digital payment platform that allows users to:

* Register and authenticate
* Link bank accounts
* Transfer money using UPI
* View transaction history
* Receive notifications
* Manage beneficiaries
* Scan & Pay via QR Code
* Pay bills and recharges

The system is designed using a microservices architecture to achieve scalability, fault tolerance, and maintainability.

---

# Functional Requirements

## User Management

* User registration
* Login using OTP/JWT
* Profile management
* KYC verification

## Bank Account Management

* Link bank account
* Verify bank account
* Set primary account

## Payments

* Send money
* Receive money
* UPI transfers
* QR code payments

## Transaction Management

* Transaction history
* Transaction status tracking
* Refund support

## Notifications

* Push notifications
* SMS notifications
* Payment success/failure alerts

## Bill Payments

* Mobile recharge
* Electricity bill
* Water bill
* DTH recharge

---

# Non Functional Requirements

## Scalability

* 50M+ users
* 5000 TPS initially
* Horizontally scalable services

## Availability

* 99.99% uptime

## Security

* JWT Authentication
* Data Encryption
* HTTPS
* Audit Logs

## Performance

* Payment latency < 2 seconds
* API latency < 200ms

---

# System Architecture

```
            Client Apps
                 |
         API Gateway
                 |
 ------------------------------------------------
 |         |         |         |        |        |
```

Auth     User     Payment    Wallet   QR      Notification
Service   Service   Service    Service  Service   Service
|
Ledger Service
|
Event Bus (Kafka)
|
------------------------------------------------
|               |              |              |
Notification     Analytics      Audit         Reporting
Consumer         Consumer      Consumer       Consumer

---

# Microservices

## 1. Auth Service

### Responsibilities

* User authentication
* OTP verification
* JWT generation
* Session management

### Database

PostgreSQL

### APIs

POST /auth/login

POST /auth/verify-otp

POST /auth/refresh-token

---

## 2. User Service

### Responsibilities

* User profile management
* KYC information
* Beneficiary management

### Database

PostgreSQL

### APIs

GET /users/me

PUT /users/profile

POST /beneficiaries

GET /beneficiaries

---

## 3. Payment Service

### Responsibilities

* Process payments
* Validate transactions
* Generate payment requests

### Database

PostgreSQL

### APIs

POST /payments

GET /payments/:id

POST /payments/refund

---

## 4. Wallet Service

### Responsibilities

* Maintain balances
* Balance inquiry
* Account statements

### Database

PostgreSQL

### APIs

GET /wallet/balance

GET /wallet/statement

---

## 5. Ledger Service

### Responsibilities

* Double-entry bookkeeping
* Financial records
* Reconciliation

### Database

PostgreSQL

### Tables

Ledger

Transactions

Accounts

JournalEntries

---

## 6. QR Service

### Responsibilities

* Generate QR
* Validate QR
* Scan and Pay

### APIs

POST /qr/generate

POST /qr/scan

---

## 7. Notification Service

### Responsibilities

* Push notifications
* SMS
* Email alerts

### Queue

Kafka

---

# Database Design

## Users

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| name       | VARCHAR   |
| email      | VARCHAR   |
| phone      | VARCHAR   |
| created_at | TIMESTAMP |

---

## Bank Accounts

| Column         | Type    |
| -------------- | ------- |
| id             | UUID    |
| user_id        | UUID    |
| account_number | VARCHAR |
| ifsc           | VARCHAR |
| status         | VARCHAR |

---

## Transactions

| Column      | Type      |
| ----------- | --------- |
| id          | UUID      |
| sender_id   | UUID      |
| receiver_id | UUID      |
| amount      | DECIMAL   |
| status      | VARCHAR   |
| created_at  | TIMESTAMP |

---

## Ledger Entries

| Column         | Type    |
| -------------- | ------- |
| id             | UUID    |
| transaction_id | UUID    |
| debit_account  | UUID    |
| credit_account | UUID    |
| amount         | DECIMAL |

---

# Payment Flow

## Send Money

1. User initiates payment.
2. API Gateway forwards request.
3. Payment Service validates request.
4. User balance checked.
5. Transaction record created.
6. Ledger entry created.
7. Sender debited.
8. Receiver credited.
9. Transaction marked SUCCESS.
10. Event published to Kafka.
11. Notification Service sends alert.

---

# Event Driven Architecture

## Payment Completed Event

Topic:

payment.completed

Payload:

{
"transactionId": "txn_123",
"senderId": "user1",
"receiverId": "user2",
"amount": 500
}

Consumers:

* Notification Service
* Analytics Service
* Audit Service

---

# Caching Strategy

## Redis

Cache:

* User Profile
* Beneficiary List
* Bank Details
* Recent Transactions

Pattern:

Cache Aside

Client
→ Service
→ Redis
→ PostgreSQL

---

# Reliability

## Retry Mechanism

Used for:

* Bank APIs
* SMS APIs
* Notification APIs

Retry Policy:

* 3 attempts
* Exponential backoff

---

## Circuit Breaker

Protects:

* Bank integrations
* External biller APIs

States:

* Closed
* Open
* Half Open

---

## Dead Letter Queue

Failed Kafka messages are pushed to DLQ for later processing.

---

# Security

## Authentication

JWT Access Token

Refresh Token

---

## Authorization

Role Based Access Control

Roles:

* USER
* ADMIN
* SUPPORT

---

## Encryption

Data in Transit

* TLS 1.3

Data at Rest

* AES-256

---

# Monitoring

## Metrics

* TPS
* Payment Success Rate
* API Latency
* Error Rate

Tools:

* Prometheus
* Grafana

---

# Logging

Centralized Logging

Tools:

* ELK Stack

Logs:

* API Logs
* Transaction Logs
* Audit Logs

---

# Deployment Architecture

```
                Internet
                     |
                Load Balancer
                     |
                API Gateway
                     |
  -------------------------------------------------
  |       |       |       |       |       |
Auth    User   Payment  Wallet   QR   Notification
                     |
                  Kafka
                     |
                 Workers
                     |
                 PostgreSQL
                     |
                   Redis
```

---

# Technology Stack

Backend:

* NestJS
* TypeScript

Database:

* PostgreSQL

Cache:

* Redis

Message Broker:

* Kafka

Storage:

* AWS S3

Authentication:

* JWT

Containerization:

* Docker

Orchestration:

* Kubernetes

Monitoring:

* Prometheus
* Grafana

Logging:

* ELK Stack

Cloud:

* AWS

---

# Future Enhancements

* Scheduled Payments
* AutoPay
* International Transfers
* Credit Card Payments
* Rewards System
* Fraud Detection
* AI-powered Spending Insights
