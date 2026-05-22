import {
BrowserRouter,
Routes,
Route
} from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Appointments from "./pages/Appointments"
import DoctorSchedules from "./pages/DoctorSchedules"
import MedicalRecords from "./pages/MedicalRecords"

import ProtectedRoute
from "./components/ProtectedRoute"

function App(){

return(

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>

<Route
path="/dashboard"

element={

<ProtectedRoute>

<Dashboard/>

</ProtectedRoute>

}
/>

<Route
path="/appointments"

element={

<ProtectedRoute>

<Appointments/>

</ProtectedRoute>

}
/>

<Route
path="/doctor-schedules"

element={

<ProtectedRoute>

<DoctorSchedules/>

</ProtectedRoute>

}
/>

<Route
path="/medical-records"

element={

<ProtectedRoute>

<MedicalRecords/>

</ProtectedRoute>

}
/>

</Routes>

</BrowserRouter>

)

}

export default App
