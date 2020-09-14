import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { loginUser } from "../../actions/index";
import "./Login.css";

const Form = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});
  const history = useHistory();

  return (
    <div className="form">
      <div className="sesion">Iniciar Sesión</div>
      <form
        onSubmit={
          (e) => alert("Hacemos de cuenta q se logueo el usuario")
          /* dispatch(loginUser(input)).then(() => 
          {
            history.push("/");
            window.location.reload();
          }) */
        }
      >
        <div>
          <input
            className="input"
            type="email"
            placeholder="nombre@ejemplo.com"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
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
