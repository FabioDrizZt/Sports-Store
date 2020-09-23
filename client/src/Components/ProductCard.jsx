import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addtoCart, getReviews } from "../redux/actions";

// Estaria bueno que cada producto tenga un subtitulo
function ProductCard({
  id,
  name,
  descripcion,
  precio,
  cantidad = 1,
  imagen,
  stock,
  categories,
  size
}) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function agregarAlCarrito() {
    // Carrito LocalStore 
    if (!user.id) {
      let myCart = JSON.parse(localStorage.getItem('myCart'));
      let producto = { "id": id, "name": name, "price": precio, "amount": cantidad, "image": imagen, "description": descripcion, "stock": stock, "size": size, "categories": categories }
      const order = (element) => element["id"] === id;
      console.log(producto);
      if (!myCart.some(order)) {
        localStorage.setItem(
          "myCart",
          JSON.stringify(myCart.concat([{ id: id, price: precio, amount: 1, "product": producto }]))
        );
      } else {
        dispatch(addtoCart(user.id, { productId: id, price: precio, amount: cantidad }));
      }
    }
  }
  return (
    <div className=" col-sm-4 cardStyle p-4">
      <div className="text-left">
        <img className="card-img-top img" src={imagen} alt="Imagen Producto" />
        <h3 className="card-title">{name}</h3>
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

          <button className="b btn" onClick={dispatch(getReviews(id))}>
            Ver mas
          </button>
        </Link>
        <button
          onClick={() => agregarAlCarrito()}
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
