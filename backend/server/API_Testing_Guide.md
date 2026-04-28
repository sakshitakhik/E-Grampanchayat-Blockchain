# E-Grampanchayat API Testing Guide

This document provides sample payloads and instructions for testing the backend APIs. Use a tool like **Postman**, **Insomnia**, or the **REST Client** extension in VS Code.

**Base URL:** `http://localhost:5000`

> [!TIP]
> **Authentication is now OPTIONAL.** You can test APIs without a token. If no token is provided, the server defaults to a "Gramsevak" role for testing. You can also pass `userId` as a query parameter or in the body for specific user testing.

---

## 1. Authentication & Users
### Signup (Citizen)
- **Endpoint:** `POST /api/auth/signup`
- **Payload:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "role": "Citizen",
  "phone": "9876543210",
  "address": "123, Village Street, Gram"
}
```

### Signup (Gramsevak)
- **Endpoint:** `POST /api/auth/signup`
- **Payload:**
```json
{
  "name": "Admin Officer",
  "email": "gramsevak@example.com",
  "password": "adminpassword",
  "role": "Gramsevak",
  "phone": "0001112223",
  "address": "Grampanchayat Office"
}
```

### Login
- **Endpoint:** `POST /api/auth/login`
- **Payload:**
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```
*Note: Copy the `token` from the response and use it as `Bearer <token>` in the Authorization header for protected routes.*

---

## 2. Certificates (Applications)
### Apply for Certificate
- **Endpoint:** `POST /api/certificates/`
- **Payload:**
```json
{
  "type": "Caste",
  "documents": ["http://storage.com/id.pdf"],
  "remarks": "Urgent requirement",
  "userId": null 
}
```

### List All Applications
- **Endpoint:** `GET /api/certificates/`
- **Description:** Returns all applications, sorted by newest first. No token/userId needed.

### Update Application Status (Gramsevak)
- **Endpoint:** `PUT /api/certificates/{id}/status`
- **Header:** `Authorization: Bearer <GRAMSEVAK_TOKEN>`
- **Payload:**
```json
{
  "status": "Approved",
  "remarks": "Documents verified successfully."
}
```

---

## 3. Complaints
### Submit Complaint (Citizen)
- **Endpoint:** `POST /api/complaints/`
- **Header:** `Authorization: Bearer <CITIZEN_TOKEN>`
- **Payload:**
```json
{
  "subject": "Water Supply Issue",
  "description": "The main water pipe in Sector 4 is leaking since yesterday."
}
```

### Resolve Complaint (Gramsevak)
- **Endpoint:** `PUT /api/complaints/{id}/resolve`
- **Header:** `Authorization: Bearer <GRAMSEVAK_TOKEN>`

---

## 4. Announcements
### Create Announcement (Gramsevak)
- **Endpoint:** `POST /api/announcements/`
- **Header:** `Authorization: Bearer <GRAMSEVAK_TOKEN>`
- **Payload:**
```json
{
  "title": "Gram Sabha Meeting",
  "content": "A general meeting is scheduled for Sunday at 10:00 AM in the community hall.",
  "priority": "Urgent"
}
```

### Get All Announcements (Public)
- **Endpoint:** `GET /api/announcements/`

---

## 5. Voting & Polls
### Create Poll (Gramsevak)
- **Endpoint:** `POST /api/polls/`
- **Header:** `Authorization: Bearer <GRAMSEVAK_TOKEN>`
- **Payload:**
```json
{
  "question": "Which area should get the new street lights first?",
  "options": ["North Zone", "South Zone", "Market Area", "School Road"]
}
```

### Cast a Vote (Citizen)
- **Endpoint:** `POST /api/polls/{id}/vote`
- **Header:** `Authorization: Bearer <CITIZEN_TOKEN>`
- **Payload:**
```json
{
  "optionIndex": 2
}
```

### Get Poll Results
- **Endpoint:** `GET /api/polls/{id}/results`
- **Header:** `Authorization: Bearer <ANY_TOKEN>`
