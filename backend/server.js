require("dotenv").config()

const express = require("express")
const cors = require("cors")
const db = require("./config/db")

const authRoutes = require("./routes/authRoutes")

const appointmentRoutes= require("./routes/appointmentRoutes")

const scheduleRoutes = require("./routes/scheduleRoutes")

const medicalRecordRoutes = require("./routes/medicalRecordRoutes")

const dashboardRoutes= require("./routes/dashboardRoutes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)

app.use(
"/api/appointments",
appointmentRoutes
)

app.use(
"/api/doctor-schedules",
scheduleRoutes
)

app.use(
"/api/medical-records",
medicalRecordRoutes
)

app.use(
"/api/dashboard",
dashboardRoutes
)

// Database Tables
db.serialize(() => {

    // USERS TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE,
            password TEXT,
            role TEXT
        )
    `)

    // DOCTOR SCHEDULES TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS doctor_schedules(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            doctor_id INTEGER,
            available_date TEXT,
            start_time TEXT,
            end_time TEXT
        )
    `)

    // APPOINTMENTS TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS appointments(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            appointment_id TEXT UNIQUE,
            patient_id INTEGER,
            doctor_id INTEGER,
            appointment_date TEXT,
            appointment_time TEXT,
            status TEXT
        )
    `)

    // MEDICAL RECORDS TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS medical_records(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_id INTEGER,
            doctor_id INTEGER,
            diagnosis TEXT,
            treatment TEXT,
            visit_date TEXT
        )
    `)

    // APPOINTMENT LOGS TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS appointment_logs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            appointment_id TEXT,
            action TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `)

    console.log("All Tables Created Successfully")

})

// Test Route
app.get("/", (req, res) => {
    res.send("Clinic Management API Running")
})

// Server Start
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
})