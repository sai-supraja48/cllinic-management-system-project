const db = require("../config/db")

// CREATE MEDICAL RECORD

exports.createMedicalRecord=(req,res)=>{

    const {
        patient_id,
        doctor_id,
        diagnosis,
        treatment,
        visit_date
    } = req.body

    if(
        !patient_id ||
        !doctor_id ||
        !diagnosis ||
        !treatment ||
        !visit_date
    ){

        return res.status(400).json({
            message:"All fields required"
        })

    }

    db.run(
        `INSERT INTO medical_records(
            patient_id,
            doctor_id,
            diagnosis,
            treatment,
            visit_date
        )
        VALUES(?,?,?,?,?)`,

        [
            patient_id,
            doctor_id,
            diagnosis,
            treatment,
            visit_date
        ],

        function(err){

            if(err){

                return res.status(500).json({
                    message:
                    "Medical Record Creation Failed"
                })

            }

            res.status(201).json({
                message:
                "Medical Record Created",
                recordId:this.lastID
            })

        }

    )

}



// GET MEDICAL RECORDS

exports.getMedicalRecords=(req,res)=>{

    const {patient_id}=req.query

    let query=
    `SELECT * FROM medical_records`

    let params=[]

    if(patient_id){

        query +=
        ` WHERE patient_id=?`

        params.push(patient_id)

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