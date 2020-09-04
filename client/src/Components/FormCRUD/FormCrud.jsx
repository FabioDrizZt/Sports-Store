import React,{useState,useEffect} from "react";
import CreateProduct from "./CreateProduct";
import {Link} from "react-router-dom";
import axios from "axios";

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
}, [products]);

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
<p>Nombre: {x.name}  
<button onClick={()=>eliminar(x.id)}>Eliminar</button>
<button onClick={()=>editar(x.id)}>Editar</button>
<span>id:{x.id}</span>
</p>
)
}
    </div>
    </React.Fragment>
   
)
}

export default FormCrud