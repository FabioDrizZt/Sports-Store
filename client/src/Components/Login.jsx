import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../actions"
import "./Login.css";

const Form = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});

  return (
    <div className="form">
      <div className="sesion">Iniciar Sesión</div>

      <form
        onSubmit={(e) => {
          e.preventDefault()         
          dispatch(userLogin(input))
        }}
      >
        <div>
          <input
            className="input"
            type="email"
            placeholder="nombre@ejemplo.com"
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
            required
          />
        </div>

        <div>
          <input
            className="input"
            type="password"
            placeholder="contraseña"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
            required
          />
        </div>

        <div className="boton">
          <input className="submit" type="submit" value="Iniciar Sesión" />
        </div>

        <div className="login">
          No tenes cuenta capo?
          <Link className="nav-link" to="/users">
            Registrate acá campeon
          </Link>
        </div>
      </form>
      <small>Sports Store ©</small>    
    </div>
  );
};

export default Form;
