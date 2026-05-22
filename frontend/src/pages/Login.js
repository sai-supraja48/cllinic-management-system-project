import {useState} from "react"
import {useNavigate,Link} from "react-router-dom"
import API from "../services/api"
import "../styles/Login.css"

function Login(){

const navigate=useNavigate()

const [formData,setFormData]=useState({

email:"",
password:""

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

const response=await API.post(

"/auth/login",
formData

)

localStorage.setItem(
"token",
response.data.token
)

localStorage.setItem(
"role",
response.data.role
)

navigate("/dashboard")

}catch(error){

alert(
error.response?.data?.message
|| "Login Failed"
)

}

}

return(

<div className="login-container">

<h2>Clinic Login</h2>

<form onSubmit={handleSubmit}>

<input
type="email"
name="email"
placeholder="Enter Email"
onChange={handleChange}
required
/>

<input
type="password"
name="password"
placeholder="Enter Password"
onChange={handleChange}
required
/>

<button type="submit">

Login

</button>

</form>

<p>

Don't have account?

<Link to="/register">

 Register

</Link>

</p>

</div>

)

}

export default Login