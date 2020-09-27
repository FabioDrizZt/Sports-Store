import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, updateOrder,getUsers } from "../../redux/actions";
import NavBarAdmin from "../NavBar/NavBarAdmin";
import Error from "../Error";
import "./OrdersTable.css";

function OrdersTable() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const [state, setState] = useState("");
  const users = useSelector(state=>state.users);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers())
  }, []);

  function mostrarOrdenes(state) {
    dispatch(getOrders(state));
    setState(state);
  }

  function buscarUser(id){  
    let user = users.filter(x=>x.id===id)
    return user[0].email
  }
  console.log(orders)
  console.log(users)
  // funcion para que cambie el color de la letra dependiendo del estado
  function colorEstado(estado) {
    let style = { color: "", fontWeight: "bold" };
    switch (estado) {
      case "abierta":
        style.color = "#0069D9";
        break;
      case "procesando":
        style.color = "#E0A800";
        break;
      case "cancelada":
        style.color = "#C82333";
        break;
      case "completa":
        style.color = "#218838";
        break;
      default:
        break;
    }
    return style;
  }
  if(user&&user.role==="admin"){
  return (
    <div>
      <NavBarAdmin />
      <div>
        <button
          className="btn btn-primary"
          onClick={() => mostrarOrdenes("abierta")}
        >
          Abiertas
        </button>
        <button
          className="btn btn-warning"
          onClick={() => mostrarOrdenes("procesando")}
        >
          Procesando
        </button>
        <button
          className="btn btn-danger"
          onClick={() => mostrarOrdenes("cancelada")}
        >
          Canceladas
        </button>
        <button
          className="btn btn-success"
          onClick={() => mostrarOrdenes("completa")}
        >
          Completas
        </button>
      </div>
      {orders.length!==0 &&
        orders.map((cart) => {
          return (
            <div className="order-table col-6">
              <div>
                {state === "completa" ? (
                  <div className="botones">
                    {" "}
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ margin: 0 }}
                      onClick={() => {
                        dispatch(updateOrder(cart.id, "abierta"));
                      }}
                    >
                      abrir
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ margin: 0 }}
                      onClick={() => {
                        dispatch(updateOrder(cart.id, "cancelada"));
                      }}
                    >
                      cancelar
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      style={{ margin: 0 }}
                      onClick={() => {
                        dispatch(updateOrder(cart.id, "procesando"));
                      }}
                    >
                      procesar
                    </button>{" "}
                  </div>
                ) : null}
                {state === "cancelada" ? (
                  <div className="botones">
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ margin: 0 }}
                      onClick={() => {
                        dispatch(updateOrder(cart.id, "abierta"));
                      }}
                    >
                      abrir
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      style={{ margin: 0 }}
                      onClick={() => {
                        dispatch(updateOrder(cart.id, "completa"));
                      }}
                    >
                      completar
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      style={{ margin: 0 }}
                      onClick={() => {
                        dispatch(updateOrder(cart.id, "procesando"));
                      }}
                    >
                      procesar
                    </button>{" "}
                  </div>
                ) : null}
                {state === "abierta" ? (
                  <div className="botones">
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ margin: 0 }}
                      onClick={() => {
                        dispatch(updateOrder(cart.id, "cancelada"));
                      }}
                    >
                      cancelar
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      style={{ margin: 0 }}
                      onClick={() => {
                        dispatch(updateOrder(cart.id, "completa"));
                      }}
                    >
                      completar
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      style={{ margin: 0 }}
                      onClick={() => {
                        dispatch(updateOrder(cart.id, "procesando"));
                      }}
                    >
                      procesar
                    </button>{" "}
                  </div>
                ) : null}
                {state === "procesando" ? (
                  <div className="botones">
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ margin: 0 }}
                      onClick={() => {
                        dispatch(updateOrder(cart.id, "cancelada"));
                      }}
                    >
                      cancelar
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      style={{ margin: 0 }}
                      onClick={() => {
                        dispatch(updateOrder(cart.id, "completa"));
                      }}
                    >
                      completar
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ margin: 0 }}
                      onClick={() => {
                        dispatch(updateOrder(cart.id, "abierta"));
                      }}
                    >
                      abrir
                    </button>{" "}
                  </div>
                ) : null}

                <span>
                  <b>Cart Id: </b>
                  {cart.id}
                </span>
                <span>
                  <b>User: </b>
                  {users&&cart.userId&&buscarUser(cart.userId)}
                </span>
                <span style={colorEstado(cart.state)}>
                  <b style={{ color: "black", fontWeight: "normal" }}>
                    Estado:{" "}
                  </b>
                  {cart.state}
                </span>
                <p>
                  <span>
                    <b>Órdenes: </b>
                  </span>
                  <span>
                    {cart.orders.map((order) => {
                      return (
                        <p>
                          <span>
                            <b>Id: </b>
                            {order.id}
                          </span>
                          <span>
                            <b>Producto Id: </b>
                            {order.productId}
                          </span>
                          <span>
                            <b>Cantidad: </b>
                            {order.amount}
                          </span>
                          <span>
                            <b>Precio: $</b>
                            {order.price}
                          </span>
                        </p>
                      );
                    })}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
    </div>
  )}
  else{
    return (
      <Error></Error>
    )
  }
}
export default OrdersTable;
