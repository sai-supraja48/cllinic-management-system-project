const express=require("express")

const router=express.Router()

const authMiddleware=
require("../middleware/authMiddleware")

const roleMiddleware=
require("../middleware/roleMiddleware")

const {

createMedicalRecord,
getMedicalRecords

}=require(
"../controllers/medicalRecordController"
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
createMedicalRecord
)

router.get(
"/",
authMiddleware,
getMedicalRecords
)

module.exports=router