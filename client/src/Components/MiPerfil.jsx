import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from "../redux/actions";
import "./MiPerfil.css"
import axios from "axios";
axios.defaults.withCredentials = true;

function MiPerfil (){
    const me = useSelector(state=>state.user);
    const [historial,setHistorial] = useState([]);
    const [procesadas,setProcesadas] = useState([]);
    const [canceladas,setCanceladas] = useState([]);
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
        .then(historial=>{setHistorial(historial)})
        .catch((error) => alert(error));
    },[me.id]);

    useEffect(()=>{
        axios.get(`http://localhost:3001/orders/?status=procesando`)
        .then((res) => { 
           let ordenesUsuario = res.data.filter(x=>{
              return x.userId===me.id
           })
          return ordenesUsuario
        })
        .then(ordenes=>{           
            return ordenes.map(x=>x.orders);            
        })
        .then(procesadas=>{setProcesadas(procesadas)})
        .catch((error) => alert(error));
    },[me.id])

    useEffect(()=>{
        axios.get(`http://localhost:3001/orders/?status=cancelada`)
        .then((res) => { 
           let ordenesUsuario = res.data.filter(x=>{
              return x.userId===me.id
           })
          return ordenesUsuario
        })
        .then(ordenes=>{           
            return ordenes.map(x=>x.orders);            
        })
        .then(canceladas=>{setCanceladas(canceladas)})
        .catch((error) => alert(error));
    },[me.id])
  

    return(
        <div className="mi-perfil">
        <div>
            <h3>Datos personales</h3>   
            <section style={{}}>
                <h5>Nombre: {me.name}</h5>
                <h5>Apellido: {me.lastName} </h5>
                <h5>E-mail: {me.email} </h5>
                <h5>DNI: {me.DNI} </h5>  
            </section>   
        </div>
        <div>
            <h3>Historial de compras</h3>   
            <section className = "historial">
                <h5>{procesadas.length===0 ? "Sin órdenes en proceso" : "En proceso"}</h5>
                {procesadas&&procesadas.map(x=>{     
                   return x.map(xx=>{
                        return <p key={xx.id+3}>
                         {productos.filter(y=>y.id===xx.productId).map(z=>{
                            return <h6 key={x.id+4} className="compra">
                                <img src={z.image}alt={z.name} width="200px"/>                               
                                <span style={{padding:"0 1rem"}}>{z.name} </span>Cantidad: {xx.amount} Precio: ${z.price} 
                                <span class="spinner-border" role="status"></span>
                                </h6> 
                         })}</p>
                    })            
                   
                })}
                <hr/>
                    <h5 style={canceladas.length===0?{color:"inherit"}:{color:"red"}}>{canceladas.length===0 ? "Sin órdenes canceladas" : "Órdenes canceladas"} </h5>
                {canceladas&&canceladas.map(x=>{     
                   return x.map(xx=>{
                        return <p key={xx.id+3}>
                         {productos.filter(y=>y.id===xx.productId).map(z=>{
                            return <h6 key={x.id+4}>
                                <img src={z.image}alt={z.name} width="200px"/>                                
                                <span style={{padding:"0 1rem"}}>{z.name} </span>Cantidad: {xx.amount} Precio: ${z.price} 
                                </h6> 
                         })}</p>
                    })            
                   
                })}
                  <hr/>
                    <h5>Órdenes anteriores</h5>
                {historial&&historial.map(x=>{     
                   return x.map(xx=>{
                       let fecha = xx.updatedAt;                 
                        let fecha2 = fecha.split("T")                      
                        return <p key={xx.id+3}>
                         {productos.filter(y=>y.id===xx.productId).map(z=>{
                            return <h6 key={x.id+4} className="compra">
                                <img src={z.image}alt={z.name} width="200px"/>
                                <span className="fecha text-muted">
                                    { fecha2[0] }
                                </span>
                                <span style={{padding:"0 1rem"}}>{z.name} </span>Cantidad: {xx.amount} Precio: ${z.price} 
                                </h6> 
                         })}</p>
                    })            
                   
                })}
            </section>   
        </div>
        </div>
    )
}
export default MiPerfil