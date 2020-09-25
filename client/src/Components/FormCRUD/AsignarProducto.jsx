import React, { useState, useEffect } from "react";
import { createProductCategory, getCategories } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function AsignarProducto() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products);
  const categorias = useSelector((state) => state.categories);
  // const [nameProducto, setnameProducto] = useState();
  // const [nameCategoria, setNameCategoria] = useState();
  const [idProducto, setIdProducto] = useState();
  const [idCategoria, setIdCategoria] = useState();
 
  
  // function toMayus(palabra) {
  //   var str = palabra;
  //   str = str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
  //     return letter.toUpperCase();
  //   }); //Convierte la primera letra de cada palabra en Mayuscula
  //   return str
  // }

  function asignar(e) {
    e.preventDefault();
    
    alert("Asignado PRODUCTO " + "'" + idProducto + "'" + " a CATEGORIA " + "'"+idCategoria+"'");
    dispatch(createProductCategory(idProducto, idCategoria));
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div className="mt-2">
      <form onSubmit={(e) => asignar(e)}>
        <legend>Asignar categoria a producto</legend>
        <select onChange={(e) => { setIdProducto(e.target.value)}} className="m-2">
          <option disabled selected>
            Producto
          </option>
          {productos &&
            productos.map((x) => {
              return (
                <option key={x.name + 1} value={x.id}>
                  {x.name}
                </option>
              );
            })}
        </select>
        <select
          onChange={(e) => setIdCategoria(e.target.value)}
          className="m-2"
        >
          <option disabled selected>
            Categorias
          </option>
          {categorias &&
            categorias.map((x) => {
              return (
                <option key={x.name + 2} value={x.id}>
                  {x.name}
                </option>
              );
            })}
        </select>

        <button className="btn btn-primary">Asignar</button>
      </form>
    </div>
  );
}

export default AsignarProducto;
