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
        onSubmit={(e) => alert('Hacemos de cuenta q se logueo el usuario')
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
            type="username"
            placeholder="Username"
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            className="input"
            type="password"
            placeholder="Contraseña"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
            required
          />
        </div>

        <div className="login">
          No tenes cuenta?
          <Link className="nav-link" to="/createuser">
            Registrate
          </Link>
        </div>
      </form>
      <small>SixBeer Company</small>
    </div>
  );
};

export default Form;
