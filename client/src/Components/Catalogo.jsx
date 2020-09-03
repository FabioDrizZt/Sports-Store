import React,{useState,useEffect} from "react";
import ProductCard from "./ProductCard";

function Catalogo (){
    const [products,setProducts] = useState(null);

    useEffect(()=>{
        fetch("http://localhost:3001/products")
        .then(function(response) {       
            return response.json();
          })
          .then(function(data) {
              console.log(data)
            setProducts(data)
          });
    },[])

    return (
//props: titulo, descripcion, precio, cantidad, imagen
        <React.Fragment>
            <h1>Catálogo</h1>
      {products&&products.map(x=>
      <ProductCard 
        key={x.id} 
        titulo={x.name}
        descripcion={x.description}
        precio={x.price}
        imagen={x.image}
       />)}
      </React.Fragment>
    )
}

export default Catalogo
