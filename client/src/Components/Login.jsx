import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin, gmailValidation } from "../redux/actions";
import "./Login.css";
import GoogleLogin from "react-google-login";
import { FacebookLogin, responseFacebook } from "react-facebook";
import { Card, Image } from 'react-bootstrap';

const clientIdGoogle =
  "972982669881-i7vnmbj3lr104khogicl46opq520fkes.apps.googleusercontent.com";

const Form = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  const responseGoogle = (response) => {
    const {
      email,
      familyName,
      givenName,
      imageUrl,
      googleId,
    } = response.profileObj;

    const responseFacebook = (response) => {
      console.log(response);
      setData(response);
      setPicture(response.picture.data.url);
      if (response.accessToken) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    };

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

        <div class="container">
          <Card style={{ width: "600px" }}>
            <Card.Header>
              {!login && (
                <FacebookLogin
                  appId="562118384400275"
                  autoLoad={true}
                  fields="name,email,picture"
                  scope="public_profile,user_friends"
                  callback={responseFacebook}
                  icon="fa-facebook"
                />
              )}
              {login && <Image src={picture} roundedCircle />}
            </Card.Header>
            {login && (
              <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text>{data.email}</Card.Text>
              </Card.Body>
            )}
          </Card>
        </div>
      </form>
      <small>Sports Store ©</small>
    </div>
  );
};

export default Form;
