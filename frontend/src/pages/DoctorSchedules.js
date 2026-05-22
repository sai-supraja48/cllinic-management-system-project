import {useEffect,useState} from "react"

import Navbar from "../components/Navbar"
import API from "../services/api"

function DoctorSchedules(){

const [schedules,setSchedules]=useState([])

const [formData,setFormData]=useState({

doctor_id:"",
available_date:"",
start_time:"",
end_time:""

})

useEffect(()=>{

fetchSchedules()

},[])

const fetchSchedules=async()=>{

try{

const response=
await API.get(
"/doctor-schedules"
)

setSchedules(
response.data
)

}catch(error){

console.log(error)

}

}

const handleChange=(e)=>{

setFormData({

...formData,
[e.target.name]:
e.target.value

})

}

const handleSubmit=async(e)=>{

e.preventDefault()

try{

await API.post(
"/doctor-schedules",
formData
)

alert(
"Schedule Created"
)

fetchSchedules()

setFormData({

doctor_id:"",
available_date:"",
start_time:"",
end_time:""

})

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

Doctor Schedules

</h1>

<form
onSubmit={handleSubmit}
>

<input
type="number"
name="doctor_id"
placeholder="Doctor ID"
value={formData.doctor_id}
onChange={handleChange}
required
/>

<br/>

<input
type="date"
name="available_date"
value={formData.available_date}
onChange={handleChange}
required
/>

<br/>

<input
type="text"
name="start_time"
placeholder="09:00 AM"
value={formData.start_time}
onChange={handleChange}
required
/>

<br/>

<input
type="text"
name="end_time"
placeholder="01:00 PM"
value={formData.end_time}
onChange={handleChange}
required
/>

<br/>

<button type="submit">

Create Schedule

</button>

</form>

<hr/>

<table
border="1"
cellPadding="10"
>

<thead>

<tr>

<th>Doctor</th>
<th>Date</th>
<th>Start</th>
<th>End</th>

</tr>

</thead>

<tbody>

{

schedules.map((item)=>(

<tr key={item.id}>

<td>

{item.doctor_id}

</td>

<td>

{item.available_date}

</td>

<td>

{item.start_time}

</td>

<td>

{item.end_time}

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

)

}

export default DoctorSchedules