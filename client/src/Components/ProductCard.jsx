import React from 'react';
import './ProductCard.css'
import {Link} from "react-router-dom";

// Estaria bueno que cada producto tenga un subtitulo
function ProductCard({ id, titulo, descripcion, precio, cantidad, imagen,stock }) {

    return (
        <div className="card col-sm-4 cardStyle">
        
            <div className="card-body text-left">
            <div className="containerImgTitle titleCard card-title">
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
                <button className="btn btn-warning ">Ver mas</button>
                </Link>
                <button className={stock===0?"btn btn-secondary":"btn btn-success"} 
                disabled={stock===0?true:false}>
                    {stock===0 ? "No disponible": "Agregar a Carrito"}</button>
            </div>
            
           
            </div>
        </div>
    )
}

export default ProductCard;