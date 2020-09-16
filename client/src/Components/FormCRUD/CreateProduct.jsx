import "./CreateProduct.css";
import { useDispatch } from "react-redux";
import { createProduct } from "../../actions/index";
import React, { useState, useEffect } from "react";
import { getCategories } from "../../actions";
import AsignarProducto from "./AsignarProducto";
import EliminarAsignacion from "./EliminarAsignacion";
import NavBarAdmin from '../NavBar/NavBarAdmin';
import { Redirect } from "react-router";


function CreateProduct() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [getCategories]);

  const [input, setInput] = useState({});
  const [redirect, setRedirect] = useState(false);
  const x =  Array.from(document.querySelectorAll("input"));

  function submitProduct(e, input) {
    e.preventDefault();
    dispatch(createProduct(input));
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  }
  if(redirect && x) {
    return <Redirect to="/admin/productok"/>
    
  }
  return (
    <>
    <NavBarAdmin/>
    <div className="containerAll">
      <form
        className="containerPro"
        onSubmit={(e) => {
          submitProduct(e, input);
          setTimeout(function() {
            setRedirect(true);
          },1000,);
        }}
      >
        <legend>Crear Producto</legend>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" for="name">
            Nombre
          </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                placeholder="Articulo deportivo..."
                value={input.name}
                onChange={(e) => setInput({ ...input, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" for="description">
              Descripción
          </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="description"
                name="description"
                placeholder="¿Qué dirias de tu producto?"
                value={input.description}
                onChange={(e) =>
                  setInput({ ...input, description: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              className="col-sm-2 col-form-label" for="price">
              Precio
          </label>
            <div className="col-sm-2">
              <input
                className="form-control"
                type="number"
                min="0"
                id="price"
                name="price"
                placeholder="Precio"
                value={input.price}
                onChange={(e) => setInput({ ...input, price: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" for="stock">
              Stock
          </label>
            <div className="col-sm-2">
              <input
                className="form-control"
                type="number"
                min="0"
                id="stock"
                name="stock"
                placeholder="Stock"
                value={input.stock}
                onChange={(e) => setInput({ ...input, stock: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" for="size">
              Talle
          </label>
            <div className="col-sm-2">
              <input
                className="form-control"
                type="text"
                id="size"
                name="size"
                placeholder="Talle"
                value={input.size}
                onChange={(e) => setInput({ ...input, size: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" for="image">
              Imagen
          </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="image"
                name="image"
                placeholder="Imagen"
                value={input.image}
                onChange={(e) => setInput({ ...input, image: e.target.value })}
              />
            </div>
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            value="Crear"
            style={{ margin: 0 }}
          >
            ENVIAR
        </button>

          <AsignarProducto />

          <EliminarAsignacion />
        </form>
      </div>
    </>
  );
}

export default CreateProduct;
