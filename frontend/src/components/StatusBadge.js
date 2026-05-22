function StatusBadge({status}){

let color=""

if(status==="Scheduled"){

color="orange"

}

else if(status==="Completed"){

color="green"

}

else if(status==="Cancelled"){

color="red"

}

return(

<span style={{

backgroundColor:color,
color:"white",
padding:"6px 10px",
borderRadius:"8px"

}}>

{status}

</span>

)

}

export default StatusBadge