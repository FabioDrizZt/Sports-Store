import React from "react";
import {Link} from "react-router-dom";
import "./Home.css";

function Home(){
    // Carrito LocalStore
    // Si no existe lo crea vacio
    JSON.parse(localStorage.getItem("myCart")) ??
    localStorage.setItem("myCart", JSON.stringify([]));

   return( 
    <Link to="/products">
    <div className="home"> 
        <button className="btn btn-dark">Catalogo</button>
        <button className="btn btn-dark">Mi Perfil</button>
    </div>
    </Link>
    )
}

export default Home