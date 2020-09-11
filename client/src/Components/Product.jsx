import React, {useEffect} from "react";
import { Route, Link } from 'react-router-dom';
import ProductCard from "./ProductCard";
import { useSelector,useDispatch } from "react-redux";
import { getProduct,addtoCart } from "../actions";

// Este componente envia informacion al ProductCard que le dará una maquetacion de tarjeta...

const Product = (props) => {  
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const user = useSelector(state=>state.user);
  useEffect(() => {
    dispatch(getProduct(props.match.match.params.id));
  }, []);
 
  //FALTA EL ID DEL USER, no hay nada en el store User
  function agregarAlCarrito(product){
    dispatch(addtoCart(1,{productId:product.id,price:product.price,amount:1}))
  }

  return (
    products&&
    <div class="container">
    <div className="row">
      <div id="description" className="description col-6">
        <img src={products.image} className="img-fluid"/>
        </div>
        <div className="col-5" style={{borderLeft:"2px solid #F1F1F1"}}>
          <h2>{products.name}</h2>
          <p>{products.description}</p>
          <h4>
            Precio: {products.price}
          </h4>
          <h4>
            Stock: {products.stock}
          </h4>
          <h4>
            Size: {products.size}
          </h4>
          <div>      
            <Link to="/cart">
            <button
            style={{margin:0}}
            onClick={()=>agregarAlCarrito(products)}
            className={products.stock===0?"btn btn-secondary":"btn btn-success"} 
            disabled={products.stock===0?true:false}>
            {products.stock===0 ? "No disponible": "Agregar a Carrito"}
            </button>
            </Link>  
          </div>
        </div>        
      </div>
      </div>
   
  );
};
export default Product;
