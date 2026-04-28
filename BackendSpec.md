# E-Grampanchayat Backend Specifications

This document outlines the required backend services and API endpoints to support the E-Grampanchayat frontend.

## 1. Authentication & User Management
**Base URL:** `/api/auth`

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/signup` | POST | Register a new user (Citizen/Gramsevak). |
| `/login` | POST | Authenticate user and return JWT token + role. |
| `/profile` | GET | Get current user's details. |

**Database Model: User**
- `id`: UUID
- `name`: String
- `email`: String (Unique)
- `password`: Hashed String
- `role`: Enum (Citizen, Gramsevak, Admin)
- `phone`: String
- `address`: String

---

## 2. Certificates (Applications)
**Base URL:** `/api/certificates`

| Endpoint | Method | Description | Role |
| :--- | :--- | :--- | :--- |
| `/` | POST | Apply for a new certificate. | Citizen |
| `/{id}` | GET | Get application details/status. | Citizen/Gramsevak |
| `/` | GET | List all applications. | Gramsevak |
| `/{id}/status` | PUT | Approve or Reject an application. | Gramsevak |

**Database Model: Application**
- `id`: UUID
- `userId`: UUID (Relation to User)
- `type`: Enum (Income, Caste, Residence, etc.)
- `status`: Enum (Pending, Approved, Rejected)
- `appliedDate`: DateTime
- `documents`: List of Strings (File URLs)
- `remarks`: String

---

## 3. Complaints
**Base URL:** `/api/complaints`

| Endpoint | Method | Description | Role |
| :--- | :--- | :--- | :--- |
| `/` | POST | Submit a new complaint. | Citizen |
| `/` | GET | List complaints (filtered by user if Citizen). | Citizen/Gramsevak |
| `/{id}/resolve`| PUT | Mark complaint as resolved. | Gramsevak |

**Database Model: Complaint**
- `id`: UUID
- `userId`: UUID
- `subject`: String
- `description`: Text
- `status`: Enum (Open, Resolved)
- `date`: DateTime

---

## 4. Announcements
**Base URL:** `/api/announcements`

| Endpoint | Method | Description | Role |
| :--- | :--- | :--- | :--- |
| `/` | GET | Get all active announcements. | Public/Citizen |
| `/` | POST | Create a new announcement. | Gramsevak |
| `/{id}` | DELETE | Remove an announcement. | Gramsevak |

**Database Model: Announcement**
- `id`: UUID
- `title`: String
- `content`: Text
- `priority`: Enum (Normal, High, Urgent)
- `date`: DateTime

---

## 5. Voting & Polls
**Base URL:** `/api/polls`

| Endpoint | Method | Description | Role |
| :--- | :--- | :--- | :--- |
| `/` | POST | Create a new poll. | Gramsevak |
| `/` | GET | Get all active polls. | Citizen |
| `/{id}/vote` | POST | Cast a vote. | Citizen |
| `/{id}/results`| GET | Get results for a poll. | Gramsevak/Citizen |

**Database Model: Poll**
- `id`: UUID
- `question`: String
- `options`: JSON (List of strings)
- `active`: Boolean

**Database Model: Vote**
- `id`: UUID
- `pollId`: UUID
- `userId`: UUID (One vote per user)
- `optionIndex`: Integer

---
