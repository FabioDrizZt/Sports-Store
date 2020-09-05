import React,{useState,useEffect} from "react";
import CreateProduct from "./CreateProduct";
import {Link} from "react-router-dom";

const style={  
    width:"50%",
    margin:"2rem auto",
    position:"relative",   
}


function FormCrud (){
const [products, setProducts] = useState(null);

useEffect(() => {
    fetch("http://localhost:3001/products")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
     setProducts(data);
    });
}, []);

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