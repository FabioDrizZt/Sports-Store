import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { addtoCart } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";

// Estaria bueno que cada producto tenga un subtitulo
function ProductCard({
  id,
  titulo,
  descripcion,
  precio,
  cantidad = 1,
  imagen,
  stock,
  categories,
}) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  function agregarAlCarrito(id, precio, cantidad) {
    // Carrito LocalStore 
    let myCart = JSON.parse(localStorage.getItem('myCart'));
    const producto = (element) => element["id"] === id;
    if(!myCart.some(producto)) localStorage.setItem('myCart', JSON.stringify(myCart.concat([{"id": id, "amount": 1}])));
    dispatch( addtoCart(user.id, { productId: id, price: precio, amount: cantidad }));
  }

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
            <span className="badge badge-secondary mr-1">{x.name}</span>
          ))}
        <hr />
        <h5 className="card-text">Descripcion del producto</h5>
        <p>{descripcion}</p>
        <p>Stock: {stock}</p>
        <p className="price">
          <b>$ {precio}</b>
        </p>
        <Link to={`/products/${id}`}>
          <button className="b btn">Ver mas</button>
        </Link>
          <button
            onClick={() => agregarAlCarrito(id, precio, cantidad)}
            className={stock === 0 ? "btn btn-secondary" : "btn btn-success"}
            disabled={stock === 0 ? true : false}
          >
            {stock === 0 ? "No disponible" : "Agregar a Carrito"}
          </button>
      </div>
    </div>
  );
}

export default ProductCard;
