import React from "react";
import SearchBar from "../SearchBar.jsx";
import {Link} from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
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
        </header>
        <aside className="font sidebar">
          <button className="sidebar-close-button" onClick={closeMenu}>
            X
          </button>
          <ul className="categories">
            <li>
              <Link className="option" to="/products">Catálogo</Link>
            </li>
            <li>
              <Link className="option" to="/">Inicio</Link>
            </li>
            <li>
              <Link className="option" to="/formCrud">Productos</Link >
            </li>
            <li>
              <Link className="option" to="/category">Categorías</Link>
            </li>
            <li>
              <Link className="option" to="/admin">Admin</Link>
            </li>
            <li>
              <Link className="option" to="/admin/orders">Ordenes</Link>
            </li>
                        
      <li><Link className="option" to="/users">        Usuarios      </Link></li>
          </ul>
        </aside>
      </div>
  );
}
