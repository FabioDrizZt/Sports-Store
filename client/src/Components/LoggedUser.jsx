import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {  userLogout } from "../actions"


const LoggedUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    
    return (
        <React.Fragment>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {user.name}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <div className="card-header">
                        Inicio sesion como: {user.email}
                    </div>
                    <Link to="/cart">
                        <button class="dropdown-item" type="button">Mi Carrito</button>
                    </Link>
                    <button class="dropdown-item" type="button">Mi Perfil</button>
                    <button class="dropdown-item" type="button">Ayuda</button>
                    <div className="card-footer">
                    <button onClick={() =>dispatch(userLogout())}> Cerrar sesion </button> 
                </div>
                </div>
            </div>
        </React.Fragment>
    );
  };
  
  export default LoggedUser;