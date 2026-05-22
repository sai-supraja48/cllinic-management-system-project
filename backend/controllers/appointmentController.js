const db = require("../config/db")

// CREATE APPOINTMENT

exports.createAppointment=(req,res)=>{

const {

patient_id,
doctor_id,
appointment_date,
appointment_time

}=req.body

if(

!patient_id ||
!doctor_id ||
!appointment_date ||
!appointment_time

){

return res.status(400).json({

message:"All fields required"

})

}

db.get(

`SELECT *
FROM appointments
WHERE doctor_id=?
AND appointment_date=?
AND appointment_time=?
AND status!='Cancelled'`,

[
doctor_id,
appointment_date,
appointment_time
],

(err,existingAppointment)=>{

if(err){

return res.status(500).json({

message:"Database Error"

})

}

if(existingAppointment){

return res.status(400).json({

message:
"Doctor already booked at this time"

})

}

const appointmentId=
"APT"+Date.now()

db.run(

`INSERT INTO appointments(

appointment_id,
patient_id,
doctor_id,
appointment_date,
appointment_time,
status

)

VALUES(?,?,?,?,?,?)`,

[
appointmentId,
patient_id,
doctor_id,
appointment_date,
appointment_time,
"Scheduled"
],

function(err){

if(err){

return res.status(500).json({

message:
"Appointment creation failed"

})

}


// LOG CREATED

db.run(

`INSERT INTO appointment_logs(

appointment_id,
action

)

VALUES(?,?)`,

[
appointmentId,
"Appointment Created"
]

)

res.status(201).json({

message:
"Appointment Created",

appointmentId

})

}

)

}

)

}



// GET APPOINTMENTS

exports.getAppointments=(req,res)=>{

const {

patient_id,
doctor_id,
status,
date

}=req.query

let query=`

SELECT *
FROM appointments
WHERE 1=1

`

const params=[]

if(patient_id){

query +=
` AND patient_id=?`

params.push(patient_id)

}

if(doctor_id){

query +=
` AND doctor_id=?`

params.push(doctor_id)

}

if(status){

query +=
` AND status=?`

params.push(status)

}

if(date){

query +=
` AND appointment_date=?`

params.push(date)

}

db.all(

query,
params,

(err,rows)=>{

if(err){

return res.status(500).json({

message:"Database Error"

})

}

res.json(rows)

}

)

}



// UPDATE APPOINTMENT

exports.updateAppointment=(req,res)=>{

const {id}=req.params

const {

appointment_date,
appointment_time,
status

}=req.body

db.get(

`SELECT appointment_id
FROM appointments
WHERE id=?`,

[id],

(err,appointment)=>{

if(err || !appointment){

return res.status(500).json({

message:
"Appointment Not Found"

})

}

db.run(

`UPDATE appointments

SET

appointment_date=?,
appointment_time=?,
status=?

WHERE id=?`,

[
appointment_date,
appointment_time,
status,
id
],

function(err){

if(err){

return res.status(500).json({

message:
"Update Failed"

})

}


// LOG ACTION

let action=

"Appointment Updated"

if(status==="Completed"){

action=
"Appointment Completed"

}

else if(status==="Cancelled"){

action=
"Appointment Cancelled"

}

else{

action=
"Appointment Rescheduled"

}

db.run(

`INSERT INTO appointment_logs(

appointment_id,
action

)

VALUES(?,?)`,

[
appointment.appointment_id,
action
]

)

res.json({

message:
"Appointment Updated"

})

}

)

}

)

}



// DAILY SCHEDULES

exports.getDailySchedules=(req,res)=>{

const {date}=req.query

let query=`

SELECT

doctor_id,
patient_id,
appointment_time,
appointment_date,
status

FROM appointments

WHERE 1=1

`

const params=[]

if(date){

query +=
` AND appointment_date=?`

params.push(date)

}

query +=

` ORDER BY
doctor_id,
appointment_time`

db.all(

query,
params,

(err,rows)=>{

if(err){

return res.status(500).json({

message:"Database Error"

})

}

const grouped={}

rows.forEach((item)=>{

if(!grouped[item.doctor_id]){

grouped[item.doctor_id]=[]

}

grouped[item.doctor_id].push(item)

})

res.json(grouped)

}

)

}