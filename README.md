# Blockchain-Based E-Voting System

A secure, decentralized, and transparent online voting system built using Solana blockchain, smart contracts, and QR/Aadhaar-based voter authentication. This system ensures tamper-proof vote recording, real-time result display, and enhanced voter trust through blockchain immutability.

---

##  Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Performance Metrics](#performance-metrics)
- [Project Structure](#project-structure)
- [Testing Instructions](#testing-instructions)
- [Limitations & Future Work](#limitations--future-work)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

This project aims to modernize the voting process using blockchain technology. By deploying smart contracts on the Solana blockchain, we ensure each vote is securely recorded and verifiable. The system authenticates voters via Aadhaar numbers or QR codes and restricts duplicate voting. With real-time vote tallying, administrators and voters can track progress transparently.

---

## Features

-  Tamper-proof vote recording using Solana blockchain
-  Aadhaar & QR-based voter authentication
-  Immutable smart contract-based voting system
-  Real-time vote tallying & result visualization
-  Admin panel with monitoring and control features
-  Low-latency transaction time (~1.2 seconds)
-  Web-based, user-friendly interface
-  MetaMask wallet integration for secure identity binding

---

## Tech Stack

| Layer            | Technologies/Tools                         |
|------------------|--------------------------------------------|
| Blockchain       | Solana, Anchor, Rust                        |
| Smart Contracts  | Anchor Framework                           |
| Frontend         | HTML, CSS, JavaScript                      |
| Backend          | Node.js, Express.js                        |
| Authentication   | QR Code, Aadhaar Integration               |
| Wallet           | MetaMask (for signing)                     |
| Database         | MongoDB                                    |
| Testing Tools    | Ganache (for testing), Postman             |

---

## Installation & Setup

### Prerequisites

- Node.js & npm
- MongoDB
- Solana CLI
- MetaMask extension
- Anchor framework

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/blockchain-e-voting.git
cd blockchain-e-voting

# 2. Install backend dependencies
cd backend
npm install

# 3. Start MongoDB
mongod

# 4. Run backend server
npm start

# 5. Install frontend dependencies
cd ../frontend
npm install

# 6. Run frontend
npm start

# 7. Deploy smart contracts
solana-test-validator
anchor build
anchor deploy

## Project Structure
blockchain-e-voting/
├── backend/           # Express backend + DB models
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── frontend/          # React or JS front-end
│   ├── public/
│   └── src/
├── smart-contract/    # Solana/Anchor contract code
│   ├── programs/
│   └── migrations/
└── README.md

##LICENSE
This project is licensed under the MIT License. See the LICENSE file for more information.
