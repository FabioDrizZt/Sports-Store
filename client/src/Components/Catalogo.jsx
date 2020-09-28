import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  getProducts,
  getCategories,
  getCategoryProducts,
} from "../redux/actions";
import "./Catalogo.css";

function Catalogo() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  // Carrito LocalStore
  // Si no existe lo crea vacio
  JSON.parse(localStorage.getItem("myCart")) ??
    localStorage.setItem("myCart", JSON.stringify([]));

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUser());
  }, [getProducts, getCategories]);

  function filtrarCatalogo(nombreCat) {
    dispatch(getCategoryProducts(nombreCat));
  }

  return (
    <React.Fragment>
      <div className="jumbotron jumbotron-fluid">
        <div className="containerCenter">
          <div className="catalogContainer">
            <select
              className="custom-select"
              onChange={(e) => filtrarCatalogo(e.target.value)}
            >
              <option disabled seleted="true" value>
                FILTRAR POR CATEGORIA
              </option>
              <option selected>Elige una Categoria</option>
              {categories &&
                categories.map((c) => {
                  return <option key={c.name}> {c.name} </option>;
                })}
            </select>
            <button
              className="btn-dangerP"
              onClick={() => window.location.reload()}
            >
              Todos los Productos
            </button>
          </div>
        </div>
        <div className="">
          <hr />
          <h1>Catálogo</h1>
          {products &&
            products.map((x) => (
              <ProductCard
                id={x.id}
                name={x.name}
                descripcion={x.description}
                price={x.price}
                imagen={x.image}
                stock={x.stock}
                size={x.size}
                categories={x.categories}
              />
            ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Catalogo;
