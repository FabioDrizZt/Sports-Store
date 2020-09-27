import { useSelector, useDispatch } from "react-redux";
import {
  createCategory,
  removeCategory,
  updateCategory,
  getCategories
} from "../redux/actions";
import React, { useState,useEffect } from "react";
import "./FormCategory.css";
import NavBarAdmin from "../Components/NavBar/NavBarAdmin";

function FormCategory() {
  const dispatch = useDispatch();
  const [editar, setEditar] = useState(false);
  const [idCategoria, setIdCategoria] = useState(null);
  const [input, setInput] = useState({});
  const categories = useSelector((state) => state.categories);
  const user = useSelector((state) => state.user);

  function submitCategory(e, input) {
    e.preventDefault();
    if (editar) dispatch(updateCategory(idCategoria, input));
    else dispatch(createCategory(input));
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setInput({})
  }


  useEffect(()=>{
    dispatch(getCategories())
  },[])

  if(user&&user.role==="admin"){
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
                  value={input.name}
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
                  value={input.description}
                  id="descriptionCategory"
                  onChange={(e) =>
                    setInput({ ...input, description: e.target.value })
                  }
                  required
                />
               
                <button type="submit" className="btn btn-primary mr-1"  style={{ margin: 0 }}>
                  {editar ? "EDITAR" : "AGREGAR"}
                </button>
                {editar && (
                  <button
                    className="btn btn-secondary "
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
                        setInput({name:x.name,description:x.description})
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
  )}
  else{
    return <h2 className="mt-4">Tienes que ser administrador para ver el contenido de esta página</h2>
  }
}
export default FormCategory;
