import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { removeCart, getCartUser } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import s from "./Cart.css";
import Order from "./Order";
import Checkout from "./Checkout";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState();
  const [update, setUpdate] = useState(true);
  const [check, setCheck] = useState(false);
  var carritoActual;
  // Carrito Invitado (LocalStore)
  // Si no existe lo crea vacio
  JSON.parse(localStorage.getItem("myCart")) ??
  localStorage.setItem("myCart", JSON.stringify([]));
  // Guardamos los valores de las ordenes en la variable myCart como un arreglo
  var myCart = JSON.parse(localStorage.getItem("myCart"));
  // Tomamos los valores de para mapear el carrito según el tipo de usuario
  user.id ? (carritoActual = cart) : (carritoActual = myCart);
  useEffect(() => {
    user.id && dispatch(getCartUser(user.id));
    setTotal(carritoActual.reduce(function (prev, cur) {
      return prev + cur.product.price * cur.amount;
    }, 0))
  }, [user, update, total]);
  //Para actualizar carrito automaticamente
  function updateCart () {
    setUpdate(!update);
    setTotal(carritoActual.reduce(function (prev, cur) {
        return prev + cur.product.price * cur.amount;
      }, 0)
    )
  };
  //Vaciar carrito
  function deleteCart () {
  user.id ? dispatch(removeCart(user.id)) : localStorage.setItem("myCart", JSON.stringify([]));
  };
  //Para hacer checkout
  function buy() {
    if (user.id && total > 0) {
      setCheck(true);
    } 
  };

  return (
    <div className={s.container}>
      {carritoActual && carritoActual.map((ord) => <Order order={ord} up={updateCart} />)}
      <div className={s.subtotal}>
        <h2>TOTAL DE LA COMPRA</h2>
        <h3 className={s.price}>${total}</h3>
      </div>
      <button
        className="btn btn-success mt-4"
        onClick={() => window.history.back()}>
        Volver
      </button>
      {carritoActual && carritoActual.length === 0 ? (
        <div className="mt-4">
          <h2>
            <Link to="/products">Ir al cátalogo</Link>
          </h2>
        </div>
      ) : (
        <button
          className="btn btn-danger mt-4"
          onClick={() => deleteCart()}>
          Vaciar Carrito
        </button>
      )}
      <button
        className="btn btn-success mt-4"
        onClick={() => buy()}>
        Realizar Compra
      </button>
      {(total === 0 ) && <h1>Tu carrito está vacio!</h1>}
      {(total > 0) && check && 
        <div className={s.flex}>
          <Checkout cart={cart}/>
        </div>}
    </div>
  );
};

export default Cart;