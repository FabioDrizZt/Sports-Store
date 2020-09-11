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
    dispatch(addtoCart(user.id,{productId:product.id,price:product.price,amount:1}))
  }

  return (
    products&&
    <div className="row">
      <div id="description" className="description col-6">
        <img src={products.image} className="img-fluid"/>
        </div>
        <div>
          <h2>{products.name}</h2>
          <p>{products.description}</p>
          <span>
            Precio: {products.price} / Stock: {products.stock}
          </span>
          <div>      
            <Link to="/cart">
            <button
            onClick={()=>agregarAlCarrito(products)}
            className={products.stock===0?"btn btn-secondary":"btn btn-success"} 
            disabled={products.stock===0?true:false}>
            {products.stock===0 ? "No disponible": "Agregar a Carrito"}
            </button>
            </Link>  
          </div>
        </div>
        
      </div>
   
  );
};
export default Product;
