import { React } from 'react';

export default function Product({ titulo, descripcion, precio, cantidad }) {
    return (
        <div>
            <span>{titulo}</span>
            <span>{descripcion}</span>
            <span>{precio}</span>
            <span>{cantidad}</span>
        </div>
    )

};