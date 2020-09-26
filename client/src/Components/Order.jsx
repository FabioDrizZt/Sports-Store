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
      <div className="media align-items-lg-center flex-column flex-lg-row p-3">
        <div className="media-body order-2 order-lg-1">
          <h2 className="mt-0 font-weight-bold mb-2">
            {order.product.name} ProdId:{order.product.id} OrderId {order.id}
          </h2>
          <p className="font-italic text-muted mb-0 large">
            {order.product.description}
          </p>
          <div className="d-flex align-items-center justify-content-between mt-1">
            <h3 className="font-weight-bold my-2">
              Precio: ${order.product.price}
            </h3>

            <h5 className="font-weight-bold my-2">
              Inventario: {order.product.stock}
            </h5>
            <h5 className="font-weight-bold my-2">
              Talle: {order.product.size}
            </h5>
            <span style={{ position: "-webkit-sticky", left: 0 }}>
              <h3 className="font-weight-bold my-2">
                <button
                  onClick={(e) => {
                    minusClick(e, order.product.id);
                  }}
                  style={{ width: "30px" }}
                  className="btn btn-outline-success btn-sm"
                >
                  -
                </button>
                {"Cantidad:" + order.amount}
                <button
                  onClick={(e) => {
                    plusClick(e, order.product.id);
                  }}
                  style={{ width: "30px" }}
                  className="btn btn-outline-success btn-sm "
                >
                  +
                </button>
                SubTotal: ${order.amount * order.product.price}
                <button
                  className="btn btn-danger"
                  onClick={(e) => deleteItem(e, order.product.id)}
                >
                  Eliminar
                </button>
              </h3>
            </span>
          </div>
        </div>
        <img
          src={order.product.image}
          alt={order.product.name}
          width="200"
          class="ml-lg-5 order-1 order-lg-2"
        />
      </div>
    </React.Fragment>
  );
};

export default Order;
