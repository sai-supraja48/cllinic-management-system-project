const db = require("../config/db")

// CREATE DOCTOR SCHEDULE

exports.createSchedule = (req,res)=>{

    const {
        doctor_id,
        available_date,
        start_time,
        end_time
    } = req.body

    if(
        !doctor_id ||
        !available_date ||
        !start_time ||
        !end_time
    ){

        return res.status(400).json({
            message:"All fields required"
        })

    }

    db.run(
        `INSERT INTO doctor_schedules(
            doctor_id,
            available_date,
            start_time,
            end_time
        )
        VALUES(?,?,?,?)`,

        [
            doctor_id,
            available_date,
            start_time,
            end_time
        ],

        function(err){

            if(err){

                return res.status(500).json({
                    message:"Schedule creation failed"
                })

            }

            res.status(201).json({
                message:"Schedule Created",
                scheduleId:this.lastID
            })

        }

    )

}



// GET SCHEDULES

exports.getSchedules=(req,res)=>{

    db.all(
        `SELECT * FROM doctor_schedules`,

        [],

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