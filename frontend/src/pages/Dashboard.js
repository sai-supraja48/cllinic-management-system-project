import {useEffect,useState} from "react"

import Navbar from "../components/Navbar"

import API from "../services/api"

import "../styles/Dashboard.css"

function Dashboard(){

const [summary,setSummary]=useState({

totalPatients:0,
totalDoctors:0,
totalAppointments:0,
completedAppointments:0,
cancelledAppointments:0

})

useEffect(()=>{

fetchDashboard()

},[])

const fetchDashboard=async()=>{

try{

const response=
await API.get(
"/dashboard/summary"
)

setSummary(response.data)

}catch(error){

console.log(error)

}

}

return(

<div>

<Navbar/>

<div className="dashboard-container">

<h1>

Clinic Dashboard

</h1>

<div className="card-grid">

<div className="card">

<h3>Total Patients</h3>

<p>

{summary.totalPatients}

</p>

</div>

<div className="card">

<h3>Total Doctors</h3>

<p>

{summary.totalDoctors}

</p>

</div>

<div className="card">

<h3>Total Appointments</h3>

<p>

{summary.totalAppointments}

</p>

</div>

<div className="card">

<h3>Completed</h3>

<p>

{summary.completedAppointments}

</p>

</div>

<div className="card">

<h3>Cancelled</h3>

<p>

{summary.cancelledAppointments}

</p>

</div>

</div>

</div>

</div>

)

}

export default Dashboard