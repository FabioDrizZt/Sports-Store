import "./Cart.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCart, getCartUser } from "../redux/actions";
import Order from "./Order";
import Checkout from "./Checkout";


const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
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
    setTotalAmount(carritoActual.reduce(function (prev, cur) {
      return prev + cur.amount;
    }, 0)
    )
  }, [user, update, total, totalAmount]);
  //Para actualizar carrito automaticamente
  function updateCart () {
    setUpdate(!update);
    setTotal(carritoActual.reduce(function (prev, cur) {
        return prev + cur.product.price * cur.amount;
      }, 0)
    )
    setTotalAmount(carritoActual.reduce(function (prev, cur) {
      return prev + cur.amount;
    }, 0)
    )
    setUpdate(!update);
  };
  //Vaciar carrito
  function deleteCart () {
    user.id ? dispatch(removeCart(user.id)) : localStorage.setItem("myCart", JSON.stringify([]));
    setUpdate(!update);
  };
  //Para hacer checkout
  function buy() {
    setCheck(true);
  };

  return (
    (total === 0 ) ? 
    <div className="empty">
      <img src="https://www.iconfinder.com/data/icons/outline-web-application-1/20/cart-512.png" alt="Carrito Vacio" width="30%"/>
      <h2>Tu carrito de compras está vacio!</h2>
      <Link to="/products">
        <button
          className="btn btn-primary mt-4">
          Volver al Catalogo
        </button>
      </Link>
      { !user.id ? 
      <div className="botonesRegistro">
        <Link to="/login">
        <button className="btn btn-warning">Incia sesión con tu cuenta</button>
        </Link>
        <Link to="/users">
        <button className="btn btn-secondary">Regístrate ahora</button>
        </Link> 
      </div>: null}
    </div>
    :
    <div className="cart">
      <div className="tituloCart">
        <h3>Mi carrito:</h3>
      </div>
      <hr/>
      {carritoActual && carritoActual.map((ord) => <div className='orderCart'><Order order={ord} up={updateCart} /></div> )}
      <div className="checkout">
        <h3>Monto total de tu compra ({totalAmount} productos): ${total}</h3>
      </div>
      <div className="botonesCarrito">
        <Link to="/products">
        <button
          className="btn btn-primary mt-4">
          Volver al Catalogo
        </button>
        </Link>
          <button
            className="btn btn-danger mt-4"
            onClick={() => deleteCart()}>
            Vaciar Carrito
          </button>
        <button
          className="btn btn-success mt-4"
          onClick={() => buy()}>
          Realizar Compra
        </button>
      </div>
      { check && user.id ?
        <div>
          <Checkout cart={cart}/>
        </div> : null
      } 
      { check ?
        <div>
          <h3>Aún no has iniciado sesión</h3>
          <Link to="/login">
          <button className="btn btn-warning">Incia sesión con tu cuenta</button>
          </Link>
          <Link to="/users">
          <button className="btn btn-secondary">Regístrate ahora</button>
          </Link>
        </div> : null
      }
      <hr/>
      <p>
      El precio y la disponibilidad de los productos están sujetos a cambio. En el carrito de compras puedes dejar temporalmente los productos que quieras. Aparecerá el precio más reciente de cada producto.
      <br/>
      </p>
    </div>
  );
};

export default Cart;