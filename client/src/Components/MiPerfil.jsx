import React from "react"
import { useSelector } from "react-redux"

function MiPerfil (){
    const me = useSelector(state=>state.miPerfil);
  
    return(
        <div>
        <h1>Mi perfil</h1>
       { me&& me.map(x=>{
       return <div>
        <h3>Name: {x.name}</h3>
        <h3>Last name: {x.lastName} </h3>
        <h3>Email: {x.email} </h3>
        <h3>DNI: {x.DNI} </h3>
        </div>})
       }
        </div>
    )
}

export default MiPerfil