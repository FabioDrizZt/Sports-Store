import React from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";
export default function SearchBar() {
  return (
    <form className="form-inline my-2 my-lg-0">
      <input className="search form-control mr-sm-2" type="search" placeholder="Articulo..." />
      <Link to="/Product">
      <button class="btn btn-success my-2 my-sm-0" type="submit">BUSCAR</button>
      </Link>
    </form>
  );
}

// onclick={()=>searchProduct(input)}