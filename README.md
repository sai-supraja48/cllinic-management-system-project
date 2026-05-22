# Clinic Management System

A Full Stack Clinic Management System built using ReactJS, Node.js, Express.js, and SQLite.

The system supports:

- User Authentication
- Role-Based Access
- Appointment Management
- Doctor Schedule Management
- Medical Records
- Dashboard Analytics

---

# Tech Stack

## Frontend

- ReactJS
- React Router DOM
- Axios
- CSS

## Backend

- Node.js
- Express.js
- JWT Authentication

## Database

- SQLite

---

# Features

## Authentication

- Register
- Login
- JWT Authentication
- Protected Routes

## User Roles

- Patient
- Doctor
- Receptionist
- Admin

## Appointment Management

- Create Appointment
- View Appointments
- Update Appointment
- Cancel Appointment
- Complete Appointment
- Prevent Overlapping Bookings
- Appointment Logs

## Doctor Schedules

- Create Schedule
- View Schedules

## Medical Records

- Create Record
- View Records

## Dashboard

- Total Patients
- Total Doctors
- Total Appointments
- Completed Count
- Cancelled Count

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

---

## 2. Backend Setup

Open terminal.

```bash
cd backend
npm install
```

Start server:

```bash
npm run dev
```

Backend URL:

```txt
http://localhost:5000
```

---

## 3. Frontend Setup

Open another terminal.

```bash
cd frontend
npm install
```

Start frontend:

```bash
npm start
```

Frontend URL:

```txt
http://localhost:3000
```

---

# npm Commands

## Backend

Install packages:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Start server:

```bash
npm start
```

---

## Frontend

Install dependencies:

```bash
npm install
```

Run application:

```bash
npm start
```

Create production build:

```bash
npm run build
```

---

# Environment Variables

Create `.env` file inside backend folder.

Example:

```env
JWT_SECRET=mysecretkey
PORT=5000
```

---

# Database Initialization

Database used:

```txt
SQLite
```

Database file:

```txt
backend/database/clinic.db
```

Tables initialized automatically when backend server starts.

Created tables:

- users
- appointments
- appointment_logs
- doctor_schedules
- medical_records

Start backend server:

```bash
npm run dev
```

Database will initialize automatically.

---

# API Endpoint Summary

## Authentication

### Register

```txt
POST /api/auth/register
```

### Login

```txt
POST /api/auth/login
```

---

## Appointments

### Create Appointment

```txt
POST /api/appointments
```

### Get Appointments

```txt
GET /api/appointments
```

### Update Appointment

```txt
PUT /api/appointments/:id
```

---

## Doctor Schedules

### Create Schedule

```txt
POST /api/doctor-schedules
```

### Get Schedules

```txt
GET /api/doctor-schedules
```

---

## Medical Records

### Create Record

```txt
POST /api/medical-records
```

### Get Records

```txt
GET /api/medical-records
```

---

## Dashboard

### Dashboard Summary

```txt
GET /api/dashboard/summary
```

---

# Folder Structure

```txt
clinic-management-system/

backend/
│
├── config/
├── controllers/
├── database/
│   └── clinic.db
├── middleware/
├── routes/
├── server.js
├── package.json

frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── App.js
│
└── package.json
```

---

# Final UI Screenshots

Add screenshots here.

## Login Page

(Add Screenshot)

## Dashboard

(Add Screenshot)

## Appointments Page

(Add Screenshot)

## Doctor Schedules Page

(Add Screenshot)

## Medical Records Page

(Add Screenshot)

---

# Deployment

Frontend Deployment:

Add Netlify Link

Backend Deployment:

Add Render / Railway Link

---
## Demo Login Credentials

### Patient

Email: patient@gmail.com  
Password: 123456

### Doctor

Email: doctor@gmail.com  
Password: 123456

### Receptionist

Email: receptionist@gmail.com  
Password: 123456

### Admin

Email: admin@gmail.com  
Password: 123456

# Author

Sai Supraja Annam