import React,{useState,useEffect} from "react";
import CreateProduct from "./CreateProduct";
import {Link} from "react-router-dom";
import axios from "axios";

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
       console.log(response)
        return response.json();
    })
    .then(function (data) {
     alert("producto eliminado")
    });

// return axios.delete("http://localhost:3001/products/"+id)
//       .then(() => alert('Se borro el producto'))
//       .catch(error => alert(error, 'Algo salió mal al borrar el producto'))
}

function editar (id){
    return fetch("http://localhost:3001/products/"+id)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
     console.log(data);
    });
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
    <button className="btn btn-warning" onClick={()=>editar(x.id)}>Editar</button>
</span>
</div>
)
}
    </div>
    </React.Fragment>
   
)
}

export default FormCrud