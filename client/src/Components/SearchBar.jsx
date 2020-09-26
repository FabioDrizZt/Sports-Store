import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProducts } from "../redux/actions";
import { Link } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  return (
    <div >
      <div className="input-group md-form form-sm form-2 pl-0">
    <input onChange={(e) => setInput(e.target.value)} 
            className="form-control my-0 py-1 red-border" 
            type="search" 
            placeholder="Articulo..." 
            aria-label="Search"
            />
    <div className="input-group-append">
    <Link to="/Products">
    <span onClick={(e) => dispatch(searchProducts(input))} type="submit" className="input-group-text lupa" ><i className="fas fa-search "
          aria-hidden="true"></i></span>

</Link>
    </div>
  
  
  </div>



    </div>
   );
}
