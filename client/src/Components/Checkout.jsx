import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "../redux/actions";
import { Redirect } from "react-router";

import * as C from '../redux/constants'

// S72 : Crear Componente de Checkout, donde se ingrese
// la direccion de envio y se confirme la compra.
const Checkout = (cart) => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.user);
  const cs = useSelector((state) => state.cart);
  var miCarritoDelStore = cs[0].cartId;
  const [input, setInput] = useState([]);
  console.log(input.ciudad);

  const data = {
    email: active.email,
    name: active.name,
    addres: input.ciudad
  };

  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/cart/buyok" />;
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      await fetch(C.SERVER_ADDRESS + "/sendEmail", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data), 
      });
    } catch (e) {
      throw e;
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          submit(e);
          setTimeout(function () {
            setRedirect(true);
          }, 1000);
        }}
      >
        <h3>Estamos a punto de finalizar tu orden</h3>
        <div className="container form-group col-6">
          <label for="labelAddress">¿A dónde enviamos tu orden?</label>
          <input
            required
            value={input.ciudad}
            onChange={(e) => setInput({ ...input, ciudad: e.target.value })}
            name="ciudad"
            type="text"
            className="form-control"
            id="ciudad"
            placeholder="Provincia - Ciudad - Calle - Altura..."
          ></input>
        </div>
          <button
          onClick={() => {
            dispatch(updateOrder(miCarritoDelStore, "procesando"));
          }}
          className="btn btn-primary">
            Confirmar
          </button>
      </form>
    </>
  );
};

export default Checkout;