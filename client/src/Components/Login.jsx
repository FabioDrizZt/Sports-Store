import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin,gmailValidation } from "../actions";
import "./Login.css";
import GoogleLogin from 'react-google-login'
const clientIdGoogle =
  "972982669881-i7vnmbj3lr104khogicl46opq520fkes.apps.googleusercontent.com";

const Form = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});

  const responseGoogle = (response) => {
    const {
      email,
      familyName,
      givenName,
      imageUrl,
      googleId,
    } = response.profileObj;

    //guestCart
    var myCart = JSON.parse(localStorage.getItem("myCart"));

    const gmail = {
      access: "User",
      name: givenName, //obtenemos el nombre de las respuesta
      surname: familyName, //obtenemos el apellido de las respuesta
      email: email, //obtenemos el email de las respuesta
      password: googleId, //seteamos una password
      img: imageUrl,
      guest: myCart,
    };
    dispatch(gmailValidation(gmail));
    localStorage.clear();
  };

  return (
    <div className="form">
      <div className="sesion">Iniciar Sesión</div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          Promise.all([dispatch(userLogin(input))]).then(window.history.back());
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
