import { React } from 'react';
import { Route, Link } from 'react-router-dom';


const Product = ({ name, description, price, stock, image, size }) => {
    return (
        <div class="card" style="width: 18rem;">

            <img src={image} class="card-img-top" alt="Product Image"/>

            <div class="card-body">
                <h5 class="card-title">{name}</h5>
                <p class="card-text">{description}</p>
            </div>

            <ul class="list-group list-group-flush">
                <li class="list-group-item">Size: {size}</li>
                <li class="list-group-item">Precio: {price}</li>
                <li class="list-group-item">Stock: {stock}</li>
            </ul>
            
            <div class="card-body">
                <a href="#" class="card-link">Agregar al carrito</a>
            </div>

        </div>
    )
};

export default Product;