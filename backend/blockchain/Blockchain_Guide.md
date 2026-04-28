# E-Grampanchayat Blockchain Documentation

This document explains the implementation, logic, and integration of the custom Node.js blockchain developed for the E-Grampanchayat project.

## 1. Overview
The E-Grampanchayat Blockchain is a **Private Blockchain** designed for immutable record-keeping. It ensures that critical administrative actions (like issuing certificates or filing complaints) are recorded in a way that cannot be tampered with or deleted.

### Key Features:
- **Hashing**: Uses SHA-256 for data integrity.
- **Proof of Work (PoW)**: Implements a mining mechanism to secure the chain.
- **Persistence**: Saves the chain locally to a `chain.json` file.
- **API Access**: Exposed via a separate microservice for easy integration.

---

## 2. Technical Architecture

### A. The Block Structure
Each "Block" in the chain contains:
- **Index**: Position of the block in the chain.
- **Timestamp**: When the block was created.
- **Data**: The actual record (e.g., Certificate ID, Complaint Subject).
- **PreviousHash**: The digital signature of the block before it.
- **Hash**: The digital signature of the current block.
- **Nonce**: A random number used for the mining process.

```javascript
// Logic found in backend/blockchain/src/block.js
calculateHash() {
    return CryptoJS.SHA256(
        this.index + this.previousHash + this.timestamp + 
        JSON.stringify(this.data) + this.nonce
    ).toString();
}
```

### B. The Mining Process (Proof of Work)
To prevent bad actors from flooding the system or changing data easily, every block must be "mined". The system requires the block's hash to start with a specific number of zeros (Difficulty). 
- **Difficulty 2**: The hash must start with `00...`
- The `nonce` is incremented repeatedly until a valid hash is found.

### C. The Blockchain Class
The `Blockchain` class manages the lifecycle of the chain:
1. **Genesis Block**: The first block in the chain (index 0).
2. **Validation**: It checks every block to ensure the `hash` matches the data and the `previousHash` correctly points to the preceding block.
3. **Persistence**: Every time a block is added, the entire chain is saved to `data/chain.json`.

---

## 3. Integration Logic
The main backend server (`backend/server`) communicates with the blockchain via a utility service.

### Workflow:
1. Citizen submits a **Complaint**.
2. Main Server saves it to **PostgreSQL**.
3. Main Server calls `logToBlockchain({ type: 'COMPLAINT', id: ... })`.
4. Blockchain Service **Mines** the block and saves it.

This creates a dual-record system: PostgreSQL for fast querying and Blockchain for immutable verification.

---

## 4. How to Interact

### Start the Service
```bash
cd backend/blockchain
npm install
npm run dev
```

### API Endpoints (Port 5001)
- **`GET /blocks`**: Returns the full list of blocks.
- **`POST /mine`**: Adds a new record. (Payload: `{"data": {...}}`)
- **`GET /validate`**: Returns whether the chain is currently secure.

---

## 5. Why this is "Tamper Proof"
If an entry in Block #5 is changed, its **Hash** will change. Because Block #6 contains the hash of Block #5, its link will break. Consequently, every subsequent block in the chain becomes invalid. To "hack" the chain, one would have to re-mine every single block after the tampered one, which requires significant computational effort due to the Proof of Work mechanism.
