import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin, gmailValidation } from "../redux/actions";
import "./Login.css";
import * as C from '../redux/constants'

const PasswordReset = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState();
    const [redirect, setRedirect] = useState(false);
    const [input, setInput] = useState('');

    if (redirect) return <Redirect to="/" />;

    var data = {
        email: email
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            await fetch(C.SERVER_ADDRESS+"/passwordReset", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data), 
            });
        } catch (e) {
        throw e;
        }
        setTimeout(function () {
            setRedirect(true);
        }, 1000);
    };

  return (
    <div className="form">
      <div className="sesion">Iniciar Sesión</div>
      <form
        onSubmit={(e) => {
          submit(e);
        }}
      >
        <div>
          <input
            className="input"
            type="email"
            placeholder="nombre@ejemplo.com"
            value={input.username}
            onChange={(e) => setEmail(e.target.value )}
            required
          />
        </div>
    </form>
    </div>
)};

export default PasswordReset;