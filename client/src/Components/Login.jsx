import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin, gmailValidation } from "../redux/actions";
import "./Login.css";
import GoogleLogin from "react-google-login";

const clientIdGoogle =
  "383625474548-egt3upsk655amhkill9nvbilk6rp6l59.apps.googleusercontent.com";

const Form = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});

  const responseGoogle = (response) => {
    const {
      email,
      familyName,
      givenName,
      googleId,
    } = response.profileObj;

    const gmail = {
      role: "user",
      name: givenName, //obtenemos el nombre de las respuesta
      lastName: familyName, //obtenemos el apellido de las respuesta
      email: email, //obtenemos el email de las respuesta
      password: googleId, //seteamos una password
    };
    dispatch(gmailValidation(gmail));
  };

  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Redirect to="/" />;

  return (
    <div className="form">
      <div className="sesion">Iniciar Sesión</div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(userLogin(input));
          setRedirect(true);
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
            placeholder="Contraseña"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
            required
          />
        </div>

        <Link to={`/users/passwordReset`}>
        <div className="password">
        <p>¿Olvidaste tu contraseña?</p>
        </div>
        </Link>
        
        <div className="boton">
          <input className="submitG" type="submit" value="Iniciar Sesión" />
        </div>{" "}
        <div className="login">
          No tienes Cuenta
          <Link className="nav-link" to="/users">
            Registrate acá
          </Link>
        </div>
        <div className="contenedor-google">
          <GoogleLogin
            className="boton-google"
            clientId={clientIdGoogle}
            buttonText="Ingresar con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </form>
      <small>Sports Store ©</small>
    </div>
  );
};

export default Form;