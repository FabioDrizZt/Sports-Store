import React, { useEffect } from "react";
import SearchBar from "../SearchBar.jsx";
import { Link } from "react-router-dom";
import "./NavBar.css";
import cart from "../../cart.png";
import login from "../../login.png";
import LoggedUser from "../LoggedUser"
import { useSelector } from "react-redux";

export default function NavBar() {
  const user =useSelector(state=>state.user)
  useEffect(() => {
    document.body.addEventListener("click", closeMenu);
  }, []);

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <div className="grid-container">
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>&#9776;</button>
          <Link to="/">Sports Store</Link>
        </div>
        <div>
          <SearchBar />
        </div>

        <div className="logCart">
          <Link to="/cart">
            <img src={cart} alt="cart" className="mr-4 w-50" />
          </Link>
          {user.length===0 ?   <Link to="/login">
            <img src={login} alt="login" className="mr-4 w-50" />
          </Link> : null}     
        </div>
        <LoggedUser />
      </header>
      <aside className="font sidebar">
        <button className="sidebar-close-button" onClick={closeMenu}>
          X
        </button>
        <ul className="categories">
          <li>
            <Link className="option" to="/" onClick={closeMenu}>
              Inicio
            </Link>
          </li>
          <li>
            <Link className="option" to="/products" onClick={closeMenu}>
              Productos
            </Link>
          </li>

          {/* <li>    -------> Estas opciones son solo para el Admin, no deberian estar en la nav
              <Link className="option" to="/formCrud">Productos</Link >
            </li> */}
          {/* <li>
              <Link className="option" to="/category">Categorías</Link>
            </li> */}
            {user&&user.role==="admin"?<React.Fragment> <li>
            <Link className="option" to="/admin" onClick={closeMenu}>
              Admin
            </Link>
          </li>
          <li>
            <Link className="option" to="/users" onClick={closeMenu}>
              Usuarios
            </Link>
          </li></React.Fragment> : null}         
        </ul>
      </aside>
    </div>
  );
}
