import React, { useState, useEffect } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { addtoCart,getUser } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

// Estaria bueno que cada producto tenga un subtitulo
function ProductCard({
  id,
  titulo,
  descripcion,
  precio,
  cantidad,
  imagen,
  stock,
  categories,
}) {
  const dispatch = useDispatch();
  //El getUser Momentaneamente trae el user 1
  const user = useSelector((state) => state.user);

  function agregarAlCarrito() {
    dispatch(addtoCart(user.id, { productId: id, price: precio, amount: 1 }));
  }
  useEffect(() => {
    dispatch(getUser());
  }, [ getUser]);

  return (
    <div className=" col-sm-4 cardStyle p-4">
      <div className="text-left">
        <Link to={`/products/${id}`}>
          <img
            className="card-img-top img"
            src={imagen}
            alt="Imagen Producto"
          />
          <h3 className="card-title">{titulo}</h3>
        </Link>
        {categories &&
          categories.map((x) => (
            <span class="badge badge-secondary mr-1">{x.name}</span>
          ))}
        <hr />
        <h5 className="card-text">Descripcion del producto</h5>
        <p>{descripcion}</p>
        <p>{cantidad}</p>
        <p className="price">
          <b>$ {precio}</b>
        </p>
        <Link to={`/products/${id}`}>
          <button className="b btn">Ver mas</button>
        </Link>
        <Link to="/cart">
          <button
            onClick={() => agregarAlCarrito()}
            className={stock === 0 ? "btn btn-secondary" : "btn btn-success"}
            disabled={stock === 0 ? true : false}
          >
            {stock === 0 ? "No disponible" : "Agregar a Carrito"}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
