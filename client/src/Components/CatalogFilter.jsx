import React from "react";
import { Link } from "react-router-dom";
// import searchProduct from ...

export default function CatalogFilter() {

    return (
    <div>
      <select onChange= {/* (e) => selectCategory(e.target.value) */}>
        <option disabled seleted value> FILTRAR POR CATEGORIA </option>
        {category && category.map((c) => { return <option key={c.name}> {c.name} </option>; })}
      </select>
    </div>
  );
}
