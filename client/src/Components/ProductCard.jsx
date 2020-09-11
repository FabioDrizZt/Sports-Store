import React from 'react';
import './ProductCard.css'
import {Link} from "react-router-dom";
import {addtoCart} from "../actions/index";
import { useSelector,useDispatch } from "react-redux";

// Estaria bueno que cada producto tenga un subtitulo
function ProductCard({ id, titulo, descripcion, precio, cantidad, imagen,stock }) {
    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();
    //NO HAY NADA EN EL STORE USER TODAVIA
    function agregarAlCarrito(id,precio,cantidad){
        dispatch(addtoCart(1,{productId:id,price:precio,amount:cantidad}))
      }
    
    return (
        <div className=" col-sm-4 cardStyle p-4">
        
            <div className="text-left">
            
                <Link to={`/products/${id}`}>
                    <img className="card-img-top img" src={imagen} alt="Imagen Producto" />
                    <h3 className="card-title">{ titulo }</h3>     
                </Link>
                
                <hr/>

                <h5 className="card-text">Descripcion del producto</h5>
                <p>{ descripcion }</p>
                <p>{ cantidad }</p>
           
                <p className="price"><b>$ { precio }</b></p>
                <Link to={`/products/${id}`}>
                <button className="btn btn-warning">Ver mas</button>
                </Link>
                <Link to="/cart">
                <button 
                onClick={()=>agregarAlCarrito(id,precio,cantidad)}
                className={stock===0?"btn btn-secondary":"btn btn-success"} 
                disabled={stock===0?true:false}>
                    {stock===0 ? "No disponible": "Agregar a Carrito"}</button>
                    </Link>
            
           
            </div>
        </div>
    )
}

export default ProductCard;