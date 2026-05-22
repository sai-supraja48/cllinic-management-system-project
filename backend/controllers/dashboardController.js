const db = require("../config/db")

exports.getDashboardSummary=(req,res)=>{

    const summary={}

    db.get(
        `SELECT COUNT(*) AS totalPatients
         FROM users
         WHERE role='Patient'`,

        (err,patients)=>{

            if(err){
                return res.status(500).json({
                    message:"Database Error"
                })
            }

            summary.totalPatients=
            patients.totalPatients

            db.get(
                `SELECT COUNT(*) AS totalDoctors
                 FROM users
                 WHERE role='Doctor'`,

                (err,doctors)=>{

                    summary.totalDoctors=
                    doctors.totalDoctors

                    db.get(
                        `SELECT COUNT(*) AS totalAppointments
                         FROM appointments`,

                        (err,appointments)=>{

                            summary.totalAppointments=
                            appointments.totalAppointments

                            db.get(
                                `SELECT COUNT(*) AS completedAppointments
                                 FROM appointments
                                 WHERE status='Completed'`,

                                (err,completed)=>{

                                    summary.completedAppointments=
                                    completed.completedAppointments

                                    db.get(
                                        `SELECT COUNT(*) AS cancelledAppointments
                                         FROM appointments
                                         WHERE status='Cancelled'`,

                                        (err,cancelled)=>{

                                            summary.cancelledAppointments=
                                            cancelled.cancelledAppointments

                                            res.json(summary)

                                        }

                                    )

                                }

                            )

                        }

                    )

                }

            )

        }

    )

}