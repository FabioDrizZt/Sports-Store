import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { userLogout, getMe } from "../redux/actions";

const LoggedUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Redirect to="/" />;
  return (
    <React.Fragment>
      {user.length === 0 ? null : (
        <div className="dropdown LoggedUserContainer">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {user.name}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <div className="card-header">Inicio sesion como: {user.email}</div>
            <Link to="/cart">
              <button class="dropdown-item" type="button">
                Mi Carrito
              </button>
            </Link>
            <Link to="/auth/me">
              <button
                class="dropdown-item"
                type="button"
                onClick={() => dispatch(getMe())}
              >
                Mi Perfil
              </button>
            </Link>
            <div className="card-footer">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  dispatch(userLogout());
                  setRedirect(true);
                }}
              >
                {" "}
                Cerrar sesion{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LoggedUser;
