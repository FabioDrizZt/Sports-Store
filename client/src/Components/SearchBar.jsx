import React from "react";
import { Link } from "react-router-dom";
// import searchProduct from ...

export default function SearchBar() {
  return (
    <form>
      <input type="search" placeholder="Articulo..." />
      <Link to="/Product">
        <button /* onclick={()=>searchProduct(input)} */>BUSCAR</button>
      </Link>
    </form>
  );
}
