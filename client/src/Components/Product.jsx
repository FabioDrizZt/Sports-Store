import React from 'react';
// import { Route, Link } from 'react-router-dom';
import ProductCard from './ProductCard';

// Este componente envia informacion al ProductCard que le dará una maquetacion de tarjeta...

const Product = ({ titulo, descripcion, precio, cantidad, imagen }) => {
    return (
        <ProductCard 
            titulo={titulo}
            descripcion={descripcion}
            precio={precio}
            cantidad={cantidad}
            imagen={imagen}
        />

)
}

export default Product;




        {/* <div>
            <span>Nombre: {titulo}</span>
            <span>Descripcion{descripcion}</span>
            <span>Precio {precio}</span>
            <span>Cantidad {cantidad}</span>
        </div> */}
    