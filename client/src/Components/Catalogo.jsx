import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, getCategories, getCategoryProducts } from "../actions";
import './Catalogo.css';

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
const style={
  height:"100vh",
  backgroundImage:"url('https://cdn.pixabay.com/photo/2019/12/06/21/42/lone-tree-4678305_960_720.jpg')",
  backgroundSize:"cover"
}


  return (
    //props: titulo, descripcion, precio, cantidad, imagen
    <React.Fragment>
<div style={style} className="jumbotron jumbotron-fluid">
  <div className="containerCenter container">
    <h1 className="display-4">Hacé realidad tus sueños</h1>
    <p className="lead">Date el gusto de tener lo que necesitas con Sports Store</p>
    <div className="container catalogContainer">
      <select className="custom-select" onChange={(e) => filtrarCatalogo(e.target.value)}>
        <option disabled seleted value>FILTRAR POR CATEGORIA</option>
        <option selected>Elige una Categoria</option>
          {categories && categories.map((c) => {
            return <option key={c.name}> {c.name} </option>;
          })}
      </select>

      <button className="btn btn-danger" type="button" onClick={() => window.location.reload()}>
        Todos los Productos
      </button>
    </div>
  </div>
</div>




      <hr/>

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
