import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { removeCart, getCartUser, addtoCart } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import s from "./Cart.css";
import Checkout from "./Checkout";
import Order from "./Order";

const Cart = (carrito) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  // Carrito Invitado (LocalStore)
  // Si no existe lo crea vacio
  JSON.parse(localStorage.getItem("myCart")) ??
  localStorage.setItem("myCart", JSON.stringify([]));
  // Guardamos los valores de las ordenes en la variable myCart como un arreglo
  const myCart = JSON.parse(localStorage.getItem("myCart"));

  var carrito;
  user.id ? (carrito = cart) : (carrito = myCart);
  useEffect(() => {
    user.id && dispatch(getCartUser(user.id));
    user.id ? (carrito = cart) : (carrito = myCart);
  }, [user]);

  function deleteCart () {
  user.id ?  dispatch(removeCart(user.id)) : localStorage.setItem("myCart", JSON.stringify([]))
  }

  const [total, setTotal] = useState(0);
  console.log(carrito)

  return (
    <div className={s.container}>
      {carrito && carrito.map((ord) => <Order order={ord} />)}
      <div className={s.subtotal}>
        <h2>TOTAL DE LA COMPRA</h2>
        <h3 className={s.price}>${total}</h3>
      </div>
      <button
        className="btn btn-success mt-4"
        onClick={() => window.history.back()}
      >
        Volver
      </button>
      {carrito && carrito.length === 0 ? (
        <div className="mt-4">
          <h1>Tu carrito está vacio!</h1>
          <h2>
            <Link to="/products">Ir al cátalogo</Link>
          </h2>
        </div>
      ) : (
        <button
          className="btn btn-danger mt-4"
          onClick={() => deleteCart()}
        >
          Vaciar Carrito
        </button>
      )}
      <button
        className="btn btn-success mt-4"
        onClick={() =>
          setTotal(
            carrito.reduce(function (prev, cur) {
              return prev + cur.product.price * cur.amount;
            }, 0)
          )
        }
      >
        Calcular Total
      </button>
      {(user.id) && (total > 0) ? (
        <div className={s.flex}>
          <Checkout carrito={carrito[0]} />
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
