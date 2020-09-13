import React, { useState } from "react";
import "./Order.css";
import { useSelector, useDispatch } from "react-redux";
//import { removeFromCart } from "../actions"

const Order = ({
  id = 1,
  name = "Zapa",
  description = "re piola",
  size = "43",
  price = 500,
  amount = 1,
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

  function deleteItem(user, producto) {
    //   dispatch(removeFromCart(user, prod));
    alert("Producto borra2");
  }

  return (
    <React.Fragment>
      <div className="media align-items-lg-center flex-column flex-lg-row p-3">
        <div className="media-body order-2 order-lg-1">
          <h2 className="mt-0 font-weight-bold mb-2">
            {name} id:{id}
          </h2>
          <p className="font-italic text-muted mb-0 large">{description}</p>
          <div className="d-flex align-items-center justify-content-between mt-1">
            <h3 className="font-weight-bold my-2">Precio: ${price}</h3>

            <h5 className="font-weight-bold my-2">Stock: {stock}</h5>
            <h5 className="font-weight-bold my-2">Talle: {size}</h5>
            <span style={{ position: "-webkit-sticky", left: 0 }}>
        <h3 className="font-weight-bold my-2">
          <button
            onClick={(e) => {
              minusClick(e);
            }}
            style={{ width: "30px" }}
            className="btn btn-outline-success btn-sm"
          >
            -
          </button>
          {"Cantidad:" + cantidad}
          <button
            onClick={(e) => {
              plusClick(e);
            }}
            style={{ width: "30px" }}
            className="btn btn-outline-success btn-sm "
          >
            +
          </button>
          SubTotal: ${cantidad * price}
          <button
            className="btn btn-danger"
            onClick={() => deleteItem(user.id, id)}
          >
            Eliminar
          </button>
        </h3>
      </span>
          </div>
        </div>
        <img
          src={image}
          alt={name}
          width="200"
          class="ml-lg-5 order-1 order-lg-2"
        />
      </div>
      
    </React.Fragment>
  );
};

export default Order;
