import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, getCategories, getCategoryProducts } from "../actions";

function Catalogo() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

  function filtrarCatalogo(nombreCat) {
    dispatch(getCategoryProducts(nombreCat));
  }

  return (
    //props: titulo, descripcion, precio, cantidad, imagen
    <React.Fragment>
      <div>
        <select onChange={(e) => filtrarCatalogo(e.target.value)}>
          <option disabled seleted value>
            FILTRAR POR CATEGORIA
          </option>
          {categories &&
            categories.map((c) => {
              return <option key={c.name}> {c.name} </option>;
            })}
        </select>
        <button type="button" onClick={() => window.location.reload()}>
          Ver todos los productos
        </button>
      </div>
      <h1>Catálogo</h1>
      {products &&
        products.map((x) => (
          <ProductCard
            id={x.id}
            titulo={x.name}
            descripcion={x.description}
            precio={x.price}
            imagen={x.image}
          />
        ))}
    </React.Fragment>
  );
}

export default Catalogo;
