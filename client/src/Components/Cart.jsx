import { Link, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { removeCart, getCartUser } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import s from "./Cart.css";
import Checkout from "./Checkout";
import Order from "./Order";

const Cart = (carrito) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  
  const [setProductsCards] = useState([])
  const [changCart, setChangeCart] = useState("");

  const [total, setTotal] = useState(0);
    
  useEffect(() => {
    // si no esta logeado se rompe porque el user.id de alguien no logeado con items es undefined
    if (user.length!==0) {
      dispatch(getCartUser(user.id))
    }
  }, []);

  if (user.id) {
    return (
      <div className={s.container}>
        {cart && cart.map((ord) => <Order order={ord} />)}
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
        {cart && cart.length === 0 ? (
          <div className="mt-4">
            <h1>Tu carrito está vacio!</h1>
            <h2>
              <Link to="/products">Ir al cátalogo</Link>
            </h2>
          </div>
        ) : (
          <button
            className="btn btn-danger mt-4"
            onClick={() => dispatch(removeCart(user.id))}
          >
            Vaciar Carrito
          </button>
        )}
        <button
          className="btn btn-success mt-4"
          onClick={() =>
            setTotal(
              cart.reduce(function (prev, cur) {
                return prev + cur.product.price * cur.amount;
              }, 0)
            )
          }
        >
          Calcular Total
        </button>
        {total > 0 ? (
          <div className={s.flex}>
            <Checkout cart={cart[0]} />
          </div>
        ) : null}
      </div>
    );
  } else {
    // Carrito Invitado (LocalStore)
    // Si no existe lo crea vacio
    JSON.parse(localStorage.getItem("myCart")) ??
    localStorage.setItem("myCart", JSON.stringify([]));
    // Guardamos los valores de las ordenes en la variable myCart como un arreglo
    const myCart = JSON.parse(localStorage.getItem("myCart"));
    return (
      <div className={s.container}>
        {myCart && myCart.map ((e) => <Order order = {e} />)} 
        <div className={s.subtotal}>
          <h2>TOTAL DE LA COMPRA</h2>
          <h3 className={s.price}>${total}</h3>
        </div>
        {/* {total > 0 ? (
          <div className={s.flex}>
            <Checkout />
          </div>
        ) : null} */}
        <div>
          {/* <Route
            exact
            path="/cart/checkout"
            render={() => <Checkout total={total} />}
          /> */}
        </div>
        <button
          className="btn btn-success mt-4"
          onClick={() => window.history.back()}>
          Volver
        </button>
            <button
              className="btn btn-danger mt-4"
              onClick={() => localStorage.setItem("myCart", JSON.stringify([]))}>
              Vaciar Carrito
            </button>
        <button
          className="btn btn-success mt-4"
          onClick={() =>
            setTotal(
              myCart.reduce(function (prev, cur) {
                return prev + cur.product.price * cur.amount;
              }, 0))}>
          Calcular Total
        </button>
      </div>
    );
  }
};

export default Cart;
