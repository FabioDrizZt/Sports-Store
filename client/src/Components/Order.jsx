import React, { useEffect, useState } from "react";
import "./Order.css";
import { useDispatch, useSelector } from "react-redux";
import { removeOrder, updateOrderAmount } from "../redux/actions";

const Order = ({ order, up }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  function minusClick(e, id) {
    up();
    if (!user.id) {
      // Carrito Invitado (LocalStore)
      let myCart = JSON.parse(localStorage.getItem("myCart"));
      let newOrder = myCart.find((producto) => producto.id === id);
      if (newOrder["amount"] > 1) {
        newOrder["amount"] = newOrder.amount - 1;
      }
      myCart = myCart.filter((orden) => orden.id !== id);
      let newCart = myCart.concat(newOrder);
      localStorage.setItem("myCart", JSON.stringify(newCart));
    } else {
      // Carrito de Usuario (Base de datos)
      if (order.amount > 1) {
        order["amount"] = order["amount"] - 1;
        dispatch(updateOrderAmount(user.id, order));
      } else {
        alert("No puedes llevar menos de un producto");
      }
    }
  }

  function plusClick(e, id) {
    up();
    if (!user.id) {
      // Carrito Invitado (LocalStore)
      let myCart = JSON.parse(localStorage.getItem("myCart"));
      let newOrder = myCart.find((producto) => producto.id === id);
      if (newOrder["amount"] < order.product.stock) {
        newOrder["amount"] = newOrder.amount + 1;
      }
      myCart = myCart.filter((orden) => orden.id !== id);
      let newCart = myCart.concat(newOrder);
      localStorage.setItem("myCart", JSON.stringify(newCart));
    } else {
      // Carrito de Usuario (Base de datos)
      if (order.amount < order.product.stock) {
        order["amount"] = order["amount"] + 1;
        dispatch(updateOrderAmount(user.id, order));
      } else {
        alert("No puedes llevar más del inventario");
      }
    }
  };

  function deleteItem(e, id) {
    up();
    if(user.id) {
    // Carrito de Usuario (Base de datos)
      dispatch(removeOrder(order.id));
    } else {
    // Carrito Invitado (LocalStore)
      var myCart = JSON.parse(localStorage.getItem("myCart"));
      myCart = myCart.filter((orden) => orden.id !== id);
      localStorage.setItem("myCart", JSON.stringify(myCart));
    }
  };

  return (
    <React.Fragment>
      <div className="order">
        <div>
          <img className="image"
            src={order.product.image}
            alt={order.product.name}
          />
        </div>    
        <div className="info">
          <h2 className="name">
            {order.product.name}
          </h2>
          <h5 className="description">
            {order.product.description}
          </h5>
          <h6 className="stock">
            Solo queda(n) {order.product.stock} unidades en inventario (hay más unidades en camino).
          </h6>
          <h5 className="price">
            Precio: $ {order.product.price}
          </h5>
        </div>
          <div className="botones">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Talle
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">{order.product.size}</a>
              </div>
            </div>
            <div>
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  minusClick(e, order.product.id);}}>
                -
              </button>
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  plusClick(e, order.product.id);}}>
                +
              </button>
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={(e) => deleteItem(e, order.product.id)}>
                Eliminar
              </button>
            </div>
          </div>
          <div className="subtotal">
            <div>
              <h5 className="amount">
                Cantidad: {order.amount}
              </h5>
            </div>
            <div>
              <h4>
              SubTotal: ${order.amount * order.product.price}
              </h4>
            </div>
          </div>
      </div>
      <hr/>
    </React.Fragment>
  );
};

export default Order;
