import { Link, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { removeCart, getUser, getCartUser } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import s from "./Cart.css";
import Checkout from "./Checkout";
import Order from "./Order";

const Cart = (carrito) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // si no esta logeado se rompe porque el user.id de alguien no logeado con items es undefined
    if(user.id){
    dispatch(getCartUser(user.id))}
  }, []);

  return (
    <div className={s.container}>
      {cart && cart.map((ord) => <Order order={ord} />)}

      <div className={s.subtotal}>
        <h2>TOTAL DE LA COMPRA</h2>
        <h3 className={s.price}>${total}</h3>
      </div>
      {total > 0 ? (
        <div className={s.flex}>
          <Link to={`/cart/checkout`}>
            <button className="btn btn-outline-success">REALIZAR COMPRA</button>
          </Link>
        </div>
      ) : null}
      <div>
        <Route
          exact
          path="/cart/checkout"
          render={() => <Checkout total={total} />}
        />
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
    </div>
  );
};

export default Cart;
