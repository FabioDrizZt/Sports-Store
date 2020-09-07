import React,{useState,useEffect} from "react";
import CreateProduct from "./CreateProduct";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

const style={  
    width:"50%",
    margin:"2rem auto",
    position:"relative",   
}


function FormCrud (){
const products = useSelector(state=>state.products)



function eliminar(id) {
    return fetch("http://localhost:3001/products/"+id,{method:"DELETE"})
    .then(function (response) {      
        return response.json();
    })
    .then(function (data) {
     alert("producto eliminado")
    })
}

return(
    <React.Fragment>
    <CreateProduct/>
    <div>
{products&&products.map(x=>
<div style={style}>
<span>Nombre: {x.name}.</span>
<span> Id: {x.id}</span>
<span style={{position:"absolute",right:0}}>
    <button className="btn btn-danger" onClick={()=>eliminar(x.id)}>Eliminar</button>
    <Link to={"edit/product/"+x.id}>
    <button className="btn btn-warning">Editar</button>  
    </Link>    
</span>
</div>
)
}
    </div>
    </React.Fragment>
   
)
}

export default FormCrud