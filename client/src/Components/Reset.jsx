import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./PasswordReset.css";
import * as C from '../redux/constants'

const Reset = () => {
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [enviado, setEnviado] = useState(true);

    if (redirect) return <Redirect to="/login" />;

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(window.location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    const id = getParameterByName('xyz');

    var data = {
        id: id,
        password: password
      };

    const submit = async (e) => {
        e.preventDefault();
        console.log(data);
        try {
            await fetch(C.SERVER_ADDRESS+"/users/reset", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data), 
            });
        } catch (e) {
        throw e;
        }
        setEnviado(false);
        setTimeout(function () {
            setRedirect(true);
        }, 3000);
    };

  return (
    <div className="passwordReset">
    { enviado ? 
      <div className="sesion">
        <h1>Ingresa tu nueva contraseña</h1> 
      <form
        onSubmit={(e) => {
          submit(e);
        }}>
          <input
            className="input"
            type="password"
            onChange={(e) => setPassword(e.target.value )}
            required
          />
        <div className="botonEnviar">
          <input className="btn btn-primary" type="submit" value="Guardar" />
        </div>
      </form>
    </div>
      :
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Commons-emblem-success.svg/1024px-Commons-emblem-success.svg.png" alt="Correo enviado" width="30%"/>
        <h3>Tu contraseña se ha reestablecido satisfactoriamente!</h3>
      </div>
    }
    </div>
)};

export default Reset;