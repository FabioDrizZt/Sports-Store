import { useSelector, useDispatch } from "react-redux";
import { createCategory,removeCategory,updateCategory,getCategories } from "../actions/index";
import React, { useState, useEffect } from "react";
import './FormCategory.css';



function FormCategory() { 
  const [editar,setEditar] = useState(false);
  const [idCategoria,setIdCategoria] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector(state=>state.categories);

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
        if(editar){
          dispatch(updateCategory(idCategoria,input));
        }else{
          dispatch(createCategory(input));
        }      
      }

      function editarCategoria (categoria){
        setEditar(!editar)   
          
      }

      function eliminarCategoria(categoria){
        dispatch(removeCategory(categoria.id))
      }
      //Rama FormClear:
      function clearForm() {
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        );
      }

    return (   
      <div className="container">
      <div className="row">     
        <div className="col-6">
          <form onSubmit = {(e) => {submitCategory(e,input); clearForm()}} className="col formCateg">
              <h3>{editar ? "Editar" :" Crear"} Categorias</h3>
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
                    className="btn btn-primary boton"
                    disabled={noVacio(errors)}>
                      {editar ? "EDITAR" : "AGREGAR"}</button>
                      {editar&&
                <button className="btn btn-secondary boton ml-1" onClick={()=>editarCategoria()}>
                  CANCELAR
                </button>}
            </div>            
        </form>           
      </div> 
      <div className="col-6 formCateg">
        <h3>Listado de categorias</h3>
        {categories&&categories.map(x=>
            <div className="row">
                <p className="col"><b>Nombre: </b>{x.name}</p> 
                <p className="col"><b>Descripcion: </b>{x.description}</p>
                <p className="col"><b>ID: :</b> {x.id}</p>
            <div className="col botonList">
            <button type="button" style={{margin:0}}className="btn btn-danger" onClick={()=>eliminarCategoria(x)}>ELIMINAR</button>
            <button type="button" style={{margin:0}}className="btn btn-warning" onClick={()=>{
                editarCategoria(x.id)
                setIdCategoria(x.id);  
                }}>EDITAR</button>
            </div>  
            <hr/>         
            </div>           
        )}
    </div>    
    </div>
    </div>
    )
}
export default FormCategory;