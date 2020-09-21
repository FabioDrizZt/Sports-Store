import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProducts } from "../redux/actions";
import { Link } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  return (
    <form className="form-inline my-2 my-lg-0">
      <input
        className="form-control mb-0"
        type="search"
        placeholder="Articulo..."
        onChange={(e) => setInput(e.target.value)}
      />
      <Link to="/Products">
        <button
          className="btn btn-warning"
          type="submit"
          onClick={(e) => dispatch(searchProducts(input))}
        >
          BUSCAR
        </button>
      </Link>
    </form>
  );
}
