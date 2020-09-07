import { validate } from './FormCRUD/CreateProduct';
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../actions/index";
import React, { useState, useEffect } from "react";


function FormCategory() {

    const dispatch = useDispatch();
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
        
        <form onSubmit = {(e) => submitCategory(e,input)}>
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

                <label for="formGroupExampleInput">Descripcion de la Categoria</label>
                <input 
                name = "description"
                type="text" className="form-control" id="descriptionCategory"
                onChange = {handleInputChange}
                />

                <button 
                    type="submit" 
                    className="btn btn-primary"
                    // disabled={noVacio(errors)}
                >Agregar</button>
            </div>
        </form>        
    )
}
export default FormCategory;
