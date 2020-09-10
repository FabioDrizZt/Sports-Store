import React from 'react';
import './ProductCard.css'
import {Link} from "react-router-dom";

// Estaria bueno que cada producto tenga un subtitulo
function ProductCard({ id, titulo, descripcion, precio, cantidad, imagen }) {

    return (
        <div className="card col-sm-4 cardStyle">
        
            <div className="card-body text-left">
            <div className="containerImgTitle titleCard card-title">
                <Link to={`/products/${id}`}>
                    <img className="card-img-top img" src={imagen} alt="Imagen Producto" />
                    <h3 className="card-title">{ titulo }</h3>     
                </Link>
            </div>
            
                <hr/>

                <h5 className="card-text">Descripcion del producto</h5>
                <p>{ descripcion }</p>
                <p>{ cantidad }</p>
            <div className="button">
                <p className="price"><b>$ { precio }</b></p>
                <button className="btn btn-warning ">Ver mas</button>
                <button className="btn b ">Agregar a Carrito</button>
            </div>
            </div>
        </div>
    )
}

export default ProductCard;