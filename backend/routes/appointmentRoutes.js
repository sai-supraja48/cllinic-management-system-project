const express =
require("express")

const router =
express.Router()

const authMiddleware =
require("../middleware/authMiddleware")

const roleMiddleware =
require("../middleware/roleMiddleware")

const {

createAppointment,
getAppointments,
updateAppointment,
getDailySchedules

}=require(

"../controllers/appointmentController"

)


// CREATE APPOINTMENT

router.post(

"/",

authMiddleware,

roleMiddleware(

"Patient",
"Receptionist",
"Admin"

),

createAppointment

)


// GET APPOINTMENTS

router.get(

"/",

authMiddleware,

getAppointments

)


// DAILY SCHEDULES

router.get(

"/daily-schedules",

authMiddleware,

getDailySchedules

)


// UPDATE APPOINTMENT

router.put(

"/:id",

authMiddleware,

roleMiddleware(

"Patient",
"Receptionist",
"Admin"

),

updateAppointment

)

module.exports=router