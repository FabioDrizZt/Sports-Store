import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import {getCartUser} from "../redux/actions"

function MiPerfil (){
    const me = useSelector(state=>state.user);
    const cart = useSelector(state=>state.cart)
console.log(cart)
    useEffect(()=>{
        getCartUser(me.id)
    },[])    

    return(
        <React.Fragment>
        <div style={{width:"60%",margin:"4rem auto",boxShadow: "10px 10px 5px 0px rgba(201,199,201,1)"}}>
            <h3 style={{textAlign:"left",marginLeft:"1rem"}}>Datos personales</h3>   
            <div style={{width:"70%",margin:"2rem auto",textAlign:"left",paddingBottom:"2rem"}}>
                <h5>Nombre: {me.name}</h5>
                <h5>Apellido: {me.lastName} </h5>
                <h5>E-mail: {me.email} </h5>
                <h5>DNI: {me.DNI} </h5>  
            </div>   
        </div>
        <div style={{width:"60%",margin:"4rem auto",boxShadow: "10px 10px 5px 0px rgba(201,199,201,1)"}}>
            <h3 style={{textAlign:"left",marginLeft:"1rem"}}>Historial de compras</h3>   
            <div style={{width:"70%",margin:"2rem auto",textAlign:"left",paddingBottom:"2rem"}}>
               
            </div>   
        </div>
        </React.Fragment>
    )
}
export default MiPerfil