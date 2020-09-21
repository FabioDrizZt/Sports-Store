import { useSelector, useDispatch } from "react-redux";
import {
  createCategory,
  removeCategory,
  updateCategory,
} from "../redux/actions/index";
import React, { useState } from "react";
import "./FormCategory.css";
import NavBarAdmin from "../Components/NavBar/NavBarAdmin";

function FormCategory() {
  const dispatch = useDispatch();
  const [editar, setEditar] = useState(false);
  const [idCategoria, setIdCategoria] = useState(null);
  const [input, setInput] = useState({});
  const categories = useSelector((state) => state.categories);

  function submitCategory(e, input) {
    e.preventDefault();
    if (editar) dispatch(updateCategory(idCategoria, input));
    else dispatch(createCategory(input));
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  }

  return (
    <>
      <NavBarAdmin />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <form
              onSubmit={(e) => {
                submitCategory(e, input);
              }}
              className="col formCateg"
            >
              <h3>{editar ? "Editar" : " Crear"} Categorias</h3>
              <div className="form-group">
                <label for="formGroupExampleInput">
                  Nombre de la Categoria
                </label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  id="nameCategory"
                  placeholder="Ej. Zapatillas, Remeras, Botines, etc."
                  onChange={(e) => setInput({ ...input, name: e.target.value })}
                  required
                />
                <label for="formGroupExampleInput">
                  Descripcion de la Categoria
                </label>
                <input
                  name="description"
                  type="text"
                  className="form-control"
                  id="descriptionCategory"
                  onChange={(e) =>
                    setInput({ ...input, description: e.target.value })
                  }
                  required
                />
                <button type="submit" className="btn btn-primary boton">
                  {editar ? "EDITAR" : "AGREGAR"}
                </button>
                {editar && (
                  <button
                    className="btn btn-secondary boton ml-1"
                    style={{ margin: 0 }}
                    onClick={() => setEditar(!editar)}
                  >
                    CANCELAR
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="col-6 formCateg">
            <h3>Listado de categorias</h3>
            {categories &&
              categories.map((x) => (
                <div className="row">
                  <p className="col">
                    <b>Nombre: </b>
                    {x.name}
                  </p>
                  <p className="col">
                    <b>Descripcion: </b>
                    {x.description}
                  </p>
                  <p className="col">
                    <b>ID: :</b> {x.id}
                  </p>
                  <div className="col botonList">
                    <button
                      type="button"
                      style={{ margin: 0 }}
                      className="btn btn-danger"
                      onClick={() => dispatch(removeCategory(x.id))}
                    >
                      ELIMINAR
                    </button>
                    <button
                      type="button"
                      style={{ margin: 0 }}
                      className="btn btn-warning"
                      onClick={() => {
                        setEditar(!editar);
                        setIdCategoria(x.id);
                      }}
                    >
                      EDITAR
                    </button>
                  </div>
                  <hr />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default FormCategory;
