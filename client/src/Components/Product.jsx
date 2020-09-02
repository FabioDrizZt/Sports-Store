import { React } from 'react';
import { Route, Link } from 'react-router-dom';


const Product = ({ titulo, descripcion, precio, cantidad }) => {
    return (
        <div>
            <span>{titulo}</span>
            <span>{descripcion}</span>
            <span>{precio}</span>
            <span>{cantidad}</span>
        </div>
    )

}