import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from "../redux/actions";
import axios from "axios";
axios.defaults.withCredentials = true;

function MiPerfil (){
    const me = useSelector(state=>state.user);
    const [historial,setHistorial] = useState(null);
    const productos = useSelector(state=>state.products)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProducts())
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:3001/orders/?status=completa`)
        .then((res) => { 
           let ordenesUsuario = res.data.filter(x=>{
              return x.userId===me.id
           })
          return ordenesUsuario
        })
        .then(ordenes=>{
            return ordenes.map(x=>x.orders);            
        })
        .then(historial=>setHistorial(...historial))
        .catch((error) => alert(error));
    },[me.id])
  
console.log(historial)
console.log(productos)
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
                {historial&&historial.map(x=>{                   
                    return <div key={x.id+3}> {productos.filter(y=>y.id===x.productId).map(z=>{
                       return <h6 key={x.id+4}>
                           <img src={z.image}alt={z.name} width="40%"/>
                           <span style={{padding:"0 1rem"}}>{z.name} </span>Cantidad: {x.amount} Precio: ${z.price} 
                           </h6> 
                    })}</div>
                })}
            </div>   
        </div>
        </React.Fragment>
    )
}
export default MiPerfil