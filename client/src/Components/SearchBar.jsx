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
       className="form-control form-control-lg mb-0"
        type="search"
        placeholder="Articulo..."
        onChange={(e) => setInput(e.target.value)}
      />
      <Link to="/Products">
        <button
          class="btn btn-warning btn-lg"
          type="submit"
          onClick={(e) => dispatch(searchProducts(input))}
        >
          BUSCAR
        </button>
      </Link>
    </form>
  );
}
