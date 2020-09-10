import React, { useState, useEffect } from "react";
import s from "./Order.css";
import { useSelector, useDispatch } from "react-redux";
//import { removeFromCart } from "../actions"

const Order = ({
  id = 1,
  name = "Zapa",
  description = "re piola",
  size = "43",
  price = 500,
  amount = 5,
  stock = 8,
  image = "https://static.mercadoshops.com/zapatilla-salomon-speedcross-hombre-trail-running-v_iZ878255024XsZ230467303XpZ1XfZ230467303-23380324018-5XvZdxIM.jpg",
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [cantidad, setCantidad] = useState(amount);

  function minusClick(e) {
    e.preventDefault();
    cantidad !== 1
      ? setCantidad(cantidad - 1)
      : alert("no podes llevar menos de 1");
  }

  function plusClick(e) {
    e.preventDefault();
    cantidad !== stock
      ? setCantidad(cantidad + 1)
      : alert("no podes llevar mas de: " + stock);
  }

  function deleteItem(e, user, producto) {
    //   dispatch(removeFromCart(user, prod));
    alert("Producto borra2");
  }

  return (
    <div className={s.container}>
      <div className={s.card}>
        <div className={s.btn}>
          <button
            onClick={(e) => {
              deleteItem(e, 1, id);//deleteItem(e, user.id, id);
            }}
            style={{ width: "30px" }}
            className="btn btn-outline-danger btn-sm"
          >
            X
          </button>
        </div>
        <div>
          <img className={s.image} src={image} />
        </div>
        <div className={s.info}>
          <h1 className={s.title}>{name}</h1>
          <h4 className={s.title}>{description}</h4>
          <h5 className={s.size}>Talle: {size}</h5>
          <h6 className={s.uPrice}> Precio unitario: ${price}</h6>
        </div>
        <div className={s.amount}>
          <button
            onClick={(e) => {
              minusClick(e);
            }}
            style={{ width: "30px" }}
            className="btn btn-outline-success btn-sm"
          >
            -
          </button>
          <p className={s.number}>{cantidad}</p>
          <button
            onClick={(e) => {
              plusClick(e);
            }}
            style={{ width: "30px" }}
            className="btn btn-outline-success btn-sm "
          >
            +
          </button>
        </div>
        <div className={s.subtotal}>
          <p>SUBTOTAL</p>
          <h2 className={s.price}>${cantidad * price}</h2>
          <p className={s.stock}> Quedan {stock} disponibles</p>
        </div>
      </div>
    </div>
  );
};

export default Order;
