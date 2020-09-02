import React from 'react';

function ProductCard({ titulo, descripcion, precio, cantidad, imagen }) {

    return (
        <div class="card" style={{width: "18rem"}}>
        <img class="card-img-top" src={imagen} alt="Imagen Producto" />
        <div class="card-body">
            <h5 class="card-title">Titulo{ titulo }</h5>
            <p class="card-text">Descripcion{ descripcion }</p>
            <p>Precio{ precio }</p>
            <p>cantidad{ cantidad }</p>
        </div>
    </div>
    )
}

export default ProductCard;