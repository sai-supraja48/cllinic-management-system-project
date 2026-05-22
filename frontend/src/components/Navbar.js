import {
Link,
useNavigate
}
from "react-router-dom"

import "../styles/Navbar.css"

function Navbar(){

const navigate=useNavigate()

const role=
localStorage.getItem("role")

const logout=()=>{

localStorage.removeItem("token")

localStorage.removeItem("role")

navigate("/")

}

return(

<nav className="navbar">

<h2>

Clinic System

</h2>

<div>

<Link to="/dashboard">

Dashboard

</Link>

{/* PATIENT */}

{

role==="Patient"

&&

<>

<Link to="/appointments">

Appointments

</Link>

<Link to="/medical-records">

Medical Records

</Link>

</>

}

{/* DOCTOR */}

{

role==="Doctor"

&&

<>

<Link to="/doctor-schedules">

Schedules

</Link>

<Link to="/medical-records">

Medical Records

</Link>

</>

}

{/* RECEPTIONIST */}

{

role==="Receptionist"

&&

<>

<Link to="/appointments">

Appointments

</Link>

<Link to="/doctor-schedules">

Schedules

</Link>

</>

}

{/* ADMIN */}

{

role==="Admin"

&&

<>

<Link to="/appointments">

Appointments

</Link>

<Link to="/doctor-schedules">

Schedules

</Link>

<Link to="/medical-records">

Medical Records

</Link>

</>

}

<button
onClick={logout}
>

Logout

</button>

</div>

<p>

Role:

{role}

</p>

</nav>

)

}

export default Navbar