# E-Grampanchayat Project Documentation

## 1. Project Overview
E-Grampanchayat is a digital governance platform designed to streamline administrative processes at the village level. It connects Citizens and Gramsevaks (Village Officers) through a transparent, secure, and user-friendly interface.

The project uniquely integrates **Blockchain Technology** to ensure that all administrative records, such as certificate approvals and complaint tracking, are immutable and tamper-proof.

---

## 2. Technology Stack
- **Frontend**: Angular 18+, TypeScript, CSS (Vanilla/Bootstrap).
- **Backend API**: Node.js, Express.js.
- **Database**: PostgreSQL with Sequelize ORM.
- **Blockchain**: Custom Node.js Blockchain microservice (SHA-256).
- **Authentication**: JWT (JSON Web Tokens).

---

## 3. System Architecture
The project is divided into three main components:

1.  **Frontend (`/src`)**: The Angular application providing separate dashboards for Citizens and Gramsevaks.
2.  **Backend Server (`/backend/server`)**: The central API that handles business logic, database operations, and authentication.
3.  **Blockchain Service (`/backend/blockchain`)**: A standalone microservice that maintains the immutable ledger of transactions.

---

## 4. Key Features
- **Certificate Management**: Citizens can apply for Income, Caste, or Residential certificates. Gramsevaks can review, approve, or reject them.
- **Complaint Tracking**: A transparent system for citizens to report issues. Every complaint is logged on the blockchain to ensure it cannot be "deleted" without resolution.
- **Announcements**: Real-time broadcast of village meetings and government notices.
- **Digital Voting/Polls**: Secure polls for decision-making within the Grampanchayat.

---

## 5. Installation & Setup

### Prerequisites:
- Node.js (v18+)
- PostgreSQL (Running locally)

### Step 1: Backend Server Setup
```bash
cd backend/server
npm install
# Configure .env with your DB credentials
npm run dev
```

### Step 2: Blockchain Service Setup
```bash
cd backend/blockchain
npm install
npm run dev
```

### Step 3: Frontend Setup
```bash
# In the root directory
npm install
npm start
```

---

## 6. API Integration
The frontend communicates with the backend via the `CitizenService` and `GramsevakService`. 
- **Port 5000**: Main Backend API.
- **Port 5001**: Blockchain Microservice.

All critical data changes in the main server are automatically mirrored to the blockchain service to generate a cryptographic receipt (Block).

---

## 7. Developer Guides
For more detailed technical information, refer to:
- [API Testing Guide](./backend/server/API_Testing_Guide.md)
- [Blockchain Guide](./backend/blockchain/Blockchain_Guide.md)
