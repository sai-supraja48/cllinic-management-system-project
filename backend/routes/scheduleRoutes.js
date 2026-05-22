const express = require("express")

const router = express.Router()

const authMiddleware =
require("../middleware/authMiddleware")

const roleMiddleware =
require("../middleware/roleMiddleware")

const {
    createSchedule,
    getSchedules
} = require(
"../controllers/scheduleController"
)

router.post(
"/",
authMiddleware,
roleMiddleware(
"Patient",
"Doctor",
"Receptionist",
"Admin"
),
createSchedule
)

router.get(
"/",
authMiddleware,
getSchedules
)

module.exports = router