import React from "react";
import SearchBar from "../SearchBar.jsx";
import {Link} from "react-router-dom"

export default function NavBar() {
  return (
    <nav class="navbar navbar-dark bg-dark">
        <SearchBar />
        <Link to="/products">
          Catálogo
        </Link>
        <Link to="/">
          Home
        </Link>
    </nav>
  );
}