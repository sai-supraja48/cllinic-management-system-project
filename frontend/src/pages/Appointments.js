import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import StatusBadge from "../components/StatusBadge"
import API from "../services/api"

function Appointments() {

const [appointments,setAppointments]=useState([])
const [dailySchedules,setDailySchedules]=useState({})
const [loading,setLoading]=useState(false)

const [formData,setFormData]=useState({
  patient_id:"",
  doctor_id:"",
  appointment_date:"",
  appointment_time:""
})

const [statusFilter,setStatusFilter]=useState("")
const [patientFilter,setPatientFilter]=useState("")
const [doctorFilter,setDoctorFilter]=useState("")
const [dateFilter,setDateFilter]=useState("")


// FETCH APPOINTMENTS

const fetchAppointments = async()=>{

try{

setLoading(true)

const response = await API.get(
`/appointments?patient_id=${patientFilter}&doctor_id=${doctorFilter}&status=${statusFilter}&date=${dateFilter}`
)

setAppointments(response.data)

}catch(error){

console.log(error)

}finally{

setLoading(false)

}

}


// FETCH DAILY SCHEDULES

const fetchDailySchedules = async()=>{

try{

const response = await API.get(
`/appointments/daily-schedules?date=${dateFilter}`
)

setDailySchedules(response.data)

}catch(error){

console.log(error)

}

}


// IMPORTANT — useEffect FUNCTIONS KINDA

useEffect(()=>{

fetchAppointments()
fetchDailySchedules()

},[
statusFilter,
patientFilter,
doctorFilter,
dateFilter
])


// FORM CHANGE

const handleChange=(e)=>{

setFormData({

...formData,
[e.target.name]:e.target.value

})

}


// CREATE APPOINTMENT

const handleSubmit=
async(e)=>{

e.preventDefault()

try{

await API.post(

"/appointments",

formData

)

alert(
"Appointment Created"
)

fetchAppointments()

fetchDailySchedules()

setFormData({

patient_id:"",
doctor_id:"",
appointment_date:"",
appointment_time:""

})

}catch(error){

alert(

error.response?.data?.message
|| "Failed"

)

}

}


// COMPLETE / CANCEL

const updateStatus=
async(

id,
status,
date,
time

)=>{

try{

await API.put(

`/appointments/${id}`,

{

appointment_date:date,
appointment_time:time,
status

}

)

fetchAppointments()

fetchDailySchedules()

}catch(error){

alert(

error.response?.data?.message
|| "Update Failed"

)

}

}


// RESCHEDULE

const handleReschedule=
async(item)=>{

const newDate=

prompt(

"Enter New Date YYYY-MM-DD",

item.appointment_date

)

if(!newDate){

return

}

const newTime=

prompt(

"Enter New Time",

item.appointment_time

)

if(!newTime){

return

}

try{

await API.put(

`/appointments/${item.id}`,

{

appointment_date:newDate,
appointment_time:newTime,
status:"Scheduled"

}

)

alert(
"Appointment Rescheduled"
)

fetchAppointments()

fetchDailySchedules()

}catch(error){

alert(

error.response?.data?.message
|| "Failed"

)

}

}

return(

<div>

<Navbar/>

<div style={{
padding:"20px"
}}>

<h1>

Appointments

</h1>

<form
onSubmit={handleSubmit}
>

<input
type="number"
name="patient_id"
placeholder="Patient ID"
value={formData.patient_id}
onChange={handleChange}
required
/>

<br/><br/>

<input
type="number"
name="doctor_id"
placeholder="Doctor ID"
value={formData.doctor_id}
onChange={handleChange}
required
/>

<br/><br/>

<input
type="date"
name="appointment_date"
value={formData.appointment_date}
onChange={handleChange}
required
/>

<br/><br/>

<input
type="text"
name="appointment_time"
placeholder="10:00 AM"
value={formData.appointment_time}
onChange={handleChange}
required
/>

<br/><br/>

<button type="submit">

Create Appointment

</button>

</form>

<hr/>

<h3>

Filters

</h3>

<input
type="number"
placeholder="Patient ID"
value={patientFilter}
onChange={(e)=>

setPatientFilter(
e.target.value
)

}
/>

<br/><br/>

<input
type="number"
placeholder="Doctor ID"
value={doctorFilter}
onChange={(e)=>

setDoctorFilter(
e.target.value
)

}
/>

<br/><br/>

<input
type="date"
value={dateFilter}
onChange={(e)=>

setDateFilter(
e.target.value
)

}
/>

<br/><br/>

<select

value={statusFilter}

onChange={(e)=>

setStatusFilter(
e.target.value
)

}

>

<option value="">

All Status

</option>

<option value="Scheduled">

Scheduled

</option>

<option value="Completed">

Completed

</option>

<option value="Cancelled">

Cancelled

</option>

</select>

<hr/>

{

loading &&

<p>

Loading appointments...

</p>

}

<table
border="1"
cellPadding="10"
>

<thead>

<tr>

<th>Patient</th>
<th>Doctor</th>
<th>Date</th>
<th>Time</th>
<th>Status</th>
<th>Actions</th>

</tr>

</thead>

<tbody>

{

appointments.length===0

?

<tr>

<td colSpan="6">

No Appointments Found

</td>

</tr>

:

appointments.map((item)=>(

<tr key={item.id}>

<td>

{item.patient_id}

</td>

<td>

{item.doctor_id}

</td>

<td>

{item.appointment_date}

</td>

<td>

{item.appointment_time}

</td>

<td>

<StatusBadge
status={item.status}
/>

</td>

<td>

<button

onClick={()=>{

updateStatus(

item.id,
"Completed",
item.appointment_date,
item.appointment_time

)

}}

>

Complete

</button>

<button

onClick={()=>{

updateStatus(

item.id,
"Cancelled",
item.appointment_date,
item.appointment_time

)

}}

>

Cancel

</button>

<button

onClick={()=>{

handleReschedule(
item
)

}}

>

Reschedule

</button>

</td>

</tr>

))

}

</tbody>

</table>

<hr/>

<h2>

Daily Schedule Grouped By Doctor

</h2>

{

Object.keys(
dailySchedules
).map((doctorId)=>(

<div
key={doctorId}
>

<h3>

Doctor {doctorId}

</h3>

<ul>

{

dailySchedules[
doctorId
].map((item,index)=>(

<li
key={index}
>

{item.appointment_time}

—

Patient

{item.patient_id}

—

{item.status}

</li>

))

}

</ul>

</div>

))

}

</div>

</div>

)

}

export default Appointments