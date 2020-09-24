import React, { useState, useEffect} from "react";
import { createProductCategory, getCategories } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function AsignarProducto() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products);
  const categorias = useSelector((state) => state.categories);
  const [idProducto, setIdProducto] = useState();
  const [idCategoria, setIdCategoria] = useState();


  function asignar(e) {
    e.preventDefault();
    alert("Asignado producto " + idProducto + " a categoria " + idCategoria);
    dispatch(createProductCategory(idProducto, idCategoria));
  }

  useEffect(()=>{
    dispatch(getCategories())
  },[])

  return (
    <div className="mt-2">
      <form onSubmit={(e) => asignar(e)}>
        <legend>Asignar categoria a producto</legend>
        <select onChange={(e) => {setIdProducto(e.target.value);}} className="m-2">
          <option disabled selected>
            Producto
          </option>
          {productos &&
            productos.map((x) => {
              return (
                <option key={x.id + 1} value={x.id}>
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
                <option key={x.id + 2} value={x.id}>
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
