PROJECT BOOKING 2.0 - GROUP 12
https://project-booking2-0.vercel.app/
# Hotel Booking System

A full-stack hotel booking platform built with **React (Frontend)**, **Node.js (Backend)**, **PostgreSQL**, **Supabase**, and **Stripe** for payment processing.

## Features

- User Authentication with JWT
- Role-based Authorization
- Hotel Room Listings
- Room Booking System
- Payment Integration using Stripe
- Admin Dashboard
- Database Integration with Supabase/PostgreSQL

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- Supabase
- PostgreSQL
- Stripe API

---

## Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/bestabhinav97/ProjectBooking2.0.git
```

### 2. Navigate to Project Folder

```bash
cd ProjectBooking2.0
```

---

## Backend Setup

### Go to Backend Folder

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Create `.env` File

Inside the `backend` folder, create a `.env` file and add the following:

```env
JWT_SECRET=LOGINKEY

STRIPE_KEY=sk_test_51THinTCnXaMpL9ZaVjFw4X6LedMUQpgQXf3dOwwt1KVhmv3PUwyWG2X7wbVtz1y8w6jBsFMt6nWsDxak1yEG10ix00ZRK5ZWRq

STRIPE_WEBHOOK_KEY=whsec_2e42157bda524423093eb90976bfa014b71baccee0408bcce620b2f04ecc1afc

SUPABASE_URL=https://jrbfwqavaxffzxtgmncu.supabase.co/

SUPABASE_SERVICE_ROLE_KEY=sb_secret_8mCMUBOhqBFrNLlQN8Lukw_nPWvUcNx
```

### Run Backend

```bash
npm run dev
```

---

## Frontend Setup

Open a **new terminal** and navigate to the frontend folder:

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Run Frontend

```bash
npm run dev
```

---

## Running the Project

You must run both frontend and backend servers simultaneously.

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

After starting both servers, open the frontend URL shown in the terminal (usually):

```txt
http://localhost:5173
```

---

## Project Structure

```txt
ProjectBooking2.0/
│── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   └── package.json
│
│── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── package.json
│
└── README.md
```

## Contributors

- Abhinav Best
