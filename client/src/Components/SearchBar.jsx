import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProducts } from "../actions";
import { Link } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  return (
    <form className="form-inline my-2 my-lg-0">
      <input
        className="search form-control mr-sm-2"
        type="search"
        placeholder="Articulo..."
        onChange={(e) => setInput(e.target.value)}
      />
      <Link to="/Products">
        <button
          class="btn btn-success my-2 my-sm-0"
          type="submit"
          onClick={(e) => dispatch(searchProducts(input))}
        >
          BUSCAR
        </button>
      </Link>
    </form>
  );
}
