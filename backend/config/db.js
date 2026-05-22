const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./database/clinic.db",(err)=>{
    if(err){
        console.log("Database Error",err.message)
    }else{
        console.log("SQLite Connected Successfully")
    }
})

module.exports=db