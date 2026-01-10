# FinAxis: Senior Bank Engineer Interview Guide 🏦

This guide explains the architectural decisions in the **FinAxis** project and provides senior-level answers to common technical interview questions for banking roles.

---

### 1. How do you guarantee money consistency? (The "No Vanishing Money" Question)
**Answer:** We use a **Double-Entry Ledger system** backed by ACID-compliant relational databases (PostgreSQL).
- **Core Mechanism:** Instead of just updating a single "balance" column, every transaction is recorded as two offset journal entries (a Debit and a Credit). The system's total balance must always sum to zero.
- **Enforcement:** In the `PostingService`, we wrap the entire operation in a `@Transactional` block. This ensures that either both entries are saved and the balance is updated, or nothing happens. 
- **Integrity Checks:** We use **Optimistic Locking** (`@Version`) to prevent race conditions when two simultaneous transactions hit the same account.

---

### 2. How do you handle partial failures in a distributed system?
**Answer:** We implement the **Saga Pattern** (Orchestration-based).
- **Process:** When a transfer starts in the `Payment Service`, it emits a `PaymentInitiatedEvent`. Other services (Ledger, Fraud) consume this.
- **Recovery:** If the Fraud service rejects the transaction *after* the Ledger has already posted it, the Saga Orchestrator triggers a **Compensating Transaction** (a reversal posting in the Ledger) to return the state to consistent.
- **Reliability:** We use the **Transactional Outbox Pattern** to ensure that we never lose an event if Kafka goes down mid-transaction.

---

### 3. How do you design for auditability?
**Answer:** Auditability is baked into our **Immutable Ledger** design.
- **Immutability:** Once a `JournalEntry` is written, it is **never** updated or deleted. Errors are corrected with new "Reversal" or "Adjustment" entries. 
- **Traceability:** Every entry is linked to a `transaction_id` and a `correlation_id` (from the external requester), allowing us to trace any cent back to its source.
- **Security Logs:** Our `Auth Service` handles RBAC and logs every sensitive action (who accessed which account and when).

---

### 4. How do you scale reads without breaking writes?
**Answer:** We follow **CQRS (Command Query Responsibility Segregation)** principles.
- **Writes (Command):** Handled by the **Ledger Service** optimized for ACID consistency and high-integrity writes.
- **Reads (Query):** We project transaction data into a separate read-optimized view (or a dedicated Reporting DB). For high-frequency balance checks, we can use **Redis** to serve cached balances that are updated asynchronously via Kafka events.

---

### 5. How do you handle reversals?
**Answer:** In banking, we don't "Undo". We "Reverse".
- **Logic:** If a payment fails or is contested, the system creates a new transaction that is the exact mathematical inverse of the original. 
- **Implementation:** The `SagaOrchestrator` in the `payment-service` manages these workflows. If a failure event is received, it calls the `LedgerService` with a `REVERSAL` request, which adds new offsetting Journal Entries.

---

### 6. How do you migrate schemas safely in a 24/7 bank?
**Answer:** We use **Flyway/Liquibase** for versioned migrations and follow a **"Expand and Contract"** strategy.
- **Step 1:** Add the new column/table (Expand).
- **Step 2:** Update code to write to both old and new locations.
- **Step 3:** Migrate existing data in background batches.
- **Step 4:** Update code to read from only the new location.
- **Step 5:** Remove the old column (Contract).
*This ensures zero downtime and easy rollbacks.*

---

### 7. How do you secure internal services?
**Answer:** We use **Zero Trust Architecture**.
- **Edge:** OAuth2/OIDC at the API Gateway.
- **Service-to-Service:** mTLS (Mutual TLS) for encrypted communication and JWT relay for identity propagation.
- **Authorization:** Fine-grained **RBAC/ABAC** (Role/Attribute Based Access Control) is enforced at the controller level in each microservice.

---

### 🚀 Keywords to drop in the interview:
- *"Idempotency Keys"*
- *"Eventual Consistency vs. Strong Consistency"*
- *"Optimistic Locking race conditions"*
- *"Dead Letter Queues (DLQ) for failed Kafka messages"*
- *"Zero-downtime deployments"*
- *"ISO-20022 message concepts"* (The global standard for payment messaging).
