import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

function Catalogo(props) {
  const productos = useSelector(state=>state.products);
  const [category, setCategory] = useState(null);


  useEffect(() => {
    fetch("http://localhost:3001/products/categories")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setCategory(data);
      });
  }, []);

  return (
    //props: titulo, descripcion, precio, cantidad, imagen
    <React.Fragment>
      <div>
        <select onChange={(e) => Catalogo(e.target.value)}>
          <option disabled seleted value>
            FILTRAR POR CATEGORIA
          </option>
          {category &&
            category.map((c) => {
              return <option key={c.name}> {c.name} </option>;
            })}
        </select>
        <button type="button" onClick={() => window.location.reload()}>
          Ver todos los productos
        </button>
      </div>
      <h1>Catálogo</h1>
      {productos &&
        productos.map((x) => (
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
