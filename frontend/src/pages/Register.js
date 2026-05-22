import {useState} from "react"
import {useNavigate} from "react-router-dom"
import API from "../services/api"
import "../styles/Login.css"

function Register(){

const navigate=useNavigate()

const [formData,setFormData]=useState({

name:"",
email:"",
password:"",
role:"Patient"

})

const handleChange=(e)=>{

setFormData({

...formData,
[e.target.name]:e.target.value

})

}

const handleSubmit=async(e)=>{

e.preventDefault()

try{

await API.post(
"/auth/register",
formData
)

alert(
"Registration Successful"
)

navigate("/")

}catch(error){

alert(
error.response?.data?.message
|| "Registration Failed"
)

}

}

return(

<div className="login-container">

<h2>Register</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
name="name"
placeholder="Name"
onChange={handleChange}
required
/>

<input
type="email"
name="email"
placeholder="Email"
onChange={handleChange}
required
/>

<input
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
required
/>

<select
name="role"
onChange={handleChange}
>

<option>Patient</option>
<option>Doctor</option>
<option>Receptionist</option>

</select>

<button type="submit">

Register

</button>

</form>

</div>

)

}

export default Register