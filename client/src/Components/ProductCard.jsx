import React from 'react';
import './ProductCard.css'

// Estaria bueno que cada producto tenga un subtitulo
function ProductCard({ titulo, descripcion, precio, cantidad, imagen }) {

    return (
        <div className="card col-sm-4 cardStyle">
        
            <div className="card-body text-left">
            <img className="card-img-top img" src={imagen} alt="Imagen Producto" />
            <div className="card-title">    
                <label>
                <h3 className="card-title">{ titulo }</h3>                
                </label>
            </div>
                <hr/>

                <h5 className="card-text">PRODUCT INFO</h5>
                <p>{ descripcion }</p>
                <p>{ cantidad }</p>
            <div className="button">    
                <p className="price"><b>$ { precio }</b></p>
                <button className="btn btn-success ">Agregar a Carrito</button>
            </div>
            </div>
        </div>
    )
}

export default ProductCard;