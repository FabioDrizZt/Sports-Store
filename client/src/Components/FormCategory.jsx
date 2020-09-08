import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../actions/index";
import React, { useState, useEffect } from "react";



function FormCategory() { 
  const dispatch = useDispatch();
  const categories = useSelector(state=>state.categories)
function validate({ name, description}) {
    let errors = {};
    if (!name) {
      errors.name = "Debe cargar el nombre";
    }
    if (!description) {
      errors.description = "Debe cargar description";
  }
  return errors
}
    const [errors, setErrors] = useState({
        name: "",
        description: ""
      });

    const [input, setInput] = useState({
        name : "",
        description: ""
    })
    const handleInputChange = (e) => {
        setErrors(
          validate({
            ...input,
            [e.target.name]: e.target.value,
          })
        );

    setInput({
        ...input,
        [e.target.name]: e.target.value,
        });
    };
    function noVacio(obj) {
        return Object.keys(obj).length !== 0;
      }
      function submitCategory(e, input) {
        e.preventDefault();
        dispatch(createCategory(input));
      }

    return (
      <div className="row">     
        <div className="col-6">
          <form onSubmit = {(e) => submitCategory(e,input)} className="col">
            <h3>Crear Categorias</h3>
            <div className="form-group" >
                <label for="formGroupExampleInput">Nombre de la Categoria</label>
                <input 
                    name ="name" 
                    type="text" 
                    className="form-control" 
                    id="nameCategory" 
                    placeholder="Ej. Zapatillas, Remeras, Botines, etc."
                    onChange = {handleInputChange}
                    />
                   {errors.name && <p className="danger">{errors.name}</p>}
                <label for="formGroupExampleInput">Descripcion de la Categoria</label>
                <input 
                name = "description"
                type="text" className="form-control" id="descriptionCategory"
                onChange = {handleInputChange}
                />
                 {errors.description && <p className="danger">{errors.description}</p>}
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={noVacio(errors)}
                >Agregar</button>
            </div>
        </form>        
        </div>
        <div className="col-6">
          <h3>Listado de categorias</h3>
      {categories&&categories.map(x=><p>Nombre: {x.name} Descripcion: {x.description}<hr/></p>)}     
        </div>
     
    </div>
    )
}
export default FormCategory;
