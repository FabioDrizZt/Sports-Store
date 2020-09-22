import React from "react"
import { useSelector } from "react-redux"

function MiPerfil (){
    const me = useSelector(state=>state.user);
    console.log(me)
  
    return(
        <div>
        <h1>Mi perfil</h1>
       <div>
        <h3>Nombre: {me.name}</h3>
        <h3>Apellido: {me.lastName} </h3>
        <h3>E-mail: {me.email} </h3>
        <h3>DNI: {me.DNI} </h3>
        </div>
        </div>
    )
}
export default MiPerfil