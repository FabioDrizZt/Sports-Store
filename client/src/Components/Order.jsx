import React, { useEffect, useState } from "react";
import "./Order.css";
import { useSelector, useDispatch } from "react-redux";
import { removeOrder, updateOrderAmount, getMyCart } from "../actions";

const Order = ({order}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [cantidad, setCantidad] = useState(order.amount);  
  // const myCart = useSelector((state) => state.myCart);

  function minusClick(e, id) {
    e.preventDefault();
    let myCart = JSON.parse(localStorage.getItem('myCart'));
    let newOrder = myCart.find(producto => producto.id === id);
    if(newOrder["amount"] > 1) {
      newOrder["amount"] = newOrder.amount - 1;
    }
    myCart = myCart.filter(orden => orden.id !== id);
    let newCart = myCart.concat(newOrder);
    localStorage.setItem('myCart', JSON.stringify(newCart));
    if (cantidad !== 1) {
      order["amount"] = order["amount"] - 1;
      setCantidad(cantidad - 1);
      dispatch(updateOrderAmount(1, order));
    } else alert("no podes llevar menos de 1");
  }

  function plusClick(e, id) {
    // Carrito LocalStore 
    let myCart = JSON.parse(localStorage.getItem('myCart'));
    let newOrder = myCart.find(producto => producto.id === id);
    newOrder["amount"] = newOrder.amount + 1;
    myCart = myCart.filter(orden => orden.id !== id);
    let newCart = myCart.concat(newOrder);
    localStorage.setItem('myCart', JSON.stringify(newCart));
    e.preventDefault();
    if (cantidad !== order.product.stock) {
      order["amount"] = order["amount"] + 1;
      setCantidad(cantidad + 1);
      dispatch(updateOrderAmount(1, order));
    } else alert("no podes llevar mas de: " + order.product.stock);
  }

  function deleteItem(id) {
    var myCart = JSON.parse(localStorage.getItem('myCart'));
    myCart = myCart.filter(orden => orden.id !== id);
    localStorage.setItem('myCart', JSON.stringify(myCart));
    dispatch(removeOrder(order.id));
  }

  return (
    <React.Fragment>
      <div className="media align-items-lg-center flex-column flex-lg-row p-3">
        <div className="media-body order-2 order-lg-1">
          <h2 className="mt-0 font-weight-bold mb-2">
            {order.product.name} ProdId:{order.product.id} OrderId {order.id}
          </h2>
          <p className="font-italic text-muted mb-0 large">{order.product.description}</p>
          <div className="d-flex align-items-center justify-content-between mt-1">
            <h3 className="font-weight-bold my-2">Precio: ${order.product.price}</h3>

            <h5 className="font-weight-bold my-2">Stock: {order.product.stock}</h5>
            <h5 className="font-weight-bold my-2">Talle: {order.product.size}</h5>
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
                {"Cantidad:" + cantidad}
                <button
                  onClick={(e) => {
                    plusClick(e, order.product.id);
                  }}
                  style={{ width: "30px" }}
                  className="btn btn-outline-success btn-sm "
                >
                  +
                </button>
                SubTotal: ${cantidad * order.product.price}
                <button className="btn btn-danger" onClick={() => deleteItem(order.product.id)}>
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
