import {useEffect,useState} from "react"

import Navbar from "../components/Navbar"
import API from "../services/api"

function MedicalRecords(){

const [records,setRecords]=useState([])

const [formData,setFormData]=useState({

patient_id:"",
doctor_id:"",
diagnosis:"",
treatment:"",
visit_date:""

})

useEffect(()=>{

fetchRecords()

},[])

const fetchRecords=async()=>{

try{

const response=
await API.get(
"/medical-records"
)

setRecords(
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
"/medical-records",
formData
)

alert(
"Medical Record Created"
)

fetchRecords()

setFormData({

patient_id:"",
doctor_id:"",
diagnosis:"",
treatment:""

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

Medical Records

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

<br/>

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
type="text"
name="diagnosis"
placeholder="Diagnosis"
value={formData.diagnosis}
onChange={handleChange}
required
/>

<br/>

<input
type="text"
name="treatment"
placeholder="Treatment"
value={formData.treatment}
onChange={handleChange}
required
/>

<br/>

<input
type="date"
name="visit_date"
placeholder="Visit Date"
value={formData.visit_date}
onChange={handleChange}
required
/>

<br/>

<button type="submit">

Create Record

</button>


<br/>

</form>

<hr/>

<table
border="1"
cellPadding="10"
>

<thead>

<tr>

<th>Patient</th>
<th>Doctor</th>
<th>Diagnosis</th>
<th>Treatment</th>

</tr>

</thead>

<tbody>

{

records.map((item)=>(

<tr key={item.id}>

<td>

{item.patient_id}

</td>

<td>

{item.doctor_id}

</td>

<td>

{item.diagnosis}

</td>

<td>

{item.treatment}

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

export default MedicalRecords