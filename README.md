# FinAxis: Ultimate Event Ecosystem & Premium Ledger

Welcome to **FinAxis**, a high-fidelity, all-in-one Event Management Ecosystem and Distributed Banking platform. This repository showcases a dual-sided engine catering to both **Attendees** and **Event Organizers**.

## 🚀 Live Demonstration
The mobile-first web ecosystem is currently live and optimized for performance:
👉 **[https://finaxis-mobile-raphasha-final.loca.lt/](https://finaxis-mobile-raphasha-final.loca.lt/)**
*(Security Bypass: 196.39.219.232)*

## 🏗️ Ecosystem Architecture

The system transitions from a traditional double-entry core banking engine into a dynamic Event Hub.

### 1. Attendee Experience (Mobile Hub)
A premium, iOS/Android-styled interface for festival and summit attendees:
- **Digital Pass & Ticketing**: QR-based entry with gate-specific verification.
- **Event Wallet (Event Credits)**: Cashless environment using an atomic ledger for scanning and spending.
- **AI Event Butler**: An integrated LLM-powered assistant for directions, traffic status, and schedule management.
- **Lodging Management**: Real-time room assignment and check-in audits.

### 2. Organizer Dashboard (Command Center)
Powerful real-time analytics for event managers:
- **Gross Revenue Tracking**: Dynamic visualization of total event volume.
- **Vendor Power Rankings**: Live performance metrics for food, beverage, and merch stalls.
- **Crowd Surge Heatmaps**: Real-time safety monitoring of crowd density across event zones.
- **System Logs**: Audit trails for high-velocity transactions and fraud detection.

---

## 🧠 Core Engineering Patterns
- **Double-Entry Ledger**: Immutable journal entries for every credit and debit to ensure zero-loss accounting.
- **Event-Driven UI**: Real-time synchronization between attendee actions and organizer dashboards.
- **Atomic Transactions**: Ensuring wallet settlements are ACID-compliant even under high load.
- **Security-First Design**: Biometric simulation and encrypted QR tokens for entry management.

## 🛠️ Technical Stack
- **Frontend**: React (Production Minified), Babel Standalone, Custom CSS Design System.
- **Backend (Architecture)**: Java 17+, Spring Boot 3.2, PostgreSQL.
- **Messaging**: Apache Kafka (Implicit in distributed flows).
- **Icons & Graphics**: Curated Premium SVG Design System.

## 📂 Project Structure
- `index.html`: **The Unified Event Hub**. The main entry point for the dual-sided mobile ecosystem.
- `account-ledger-service/`: The heart of the platform. ACID guarantees & Journaling.
- `payment-service/`: Orchestrated movement of event credits.
- `fraud-aml-service/`: Real-time velocity checks for event security.
- `finaxis_mobile/`: Premium Flutter mobile implementation.

---

## 🚀 Getting Started

### Local Web Preview
1. Open `index.html` in any modern browser.
2. Select your role: **Attendee** or **Organizer**.
3. Interact with the **AI Butler** or simulate a **Scan-to-Pay** purchase.

### Infrastructure (Backend)
1. Start the services:
   ```bash
   docker-compose up -d
   ```
2. Build the core ledger:
   ```bash
   mvn clean install
   ```

---
*Created by Antigravity for Raphasha - 2026*
