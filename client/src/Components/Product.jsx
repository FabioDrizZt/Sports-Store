import { React } from 'react';
import { Route, Link } from 'react-router-dom';


const Product = ({ name, description, price, stock, image, size, score }) => {
    return (
        <div>

            <div id="description" className="description">
                <div>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <span>Precio: {price} / Stock: {stock}</span>
                </div>
                <div>
                    <img href={image} />
                </div>
            </div>

        </div>
    )
};

export default Product;