import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories,removeCategory,updateCategory } from "../actions/index";
import './FormCategory.css';

function CatalogoCategories() {
    
const dispatch = useDispatch();
const [editar,setEditar] = useState(false);
const [idCategoria,setIdCategoria] = useState(null);
const categories = useSelector(state=>state.categories);

function editarCategoria (categoria){
    setEditar(!editar)   
  }

function eliminarCategoria(categoria){
    dispatch(removeCategory(categoria.id))
  }


return ( 
    <div className="col-7 formCateg">
        <h3>Listado de categorias</h3>
        {categories&&categories.map(x=>
            <div className="row">
                <p className="col"><b>Nombre: </b>{x.name}<hr/></p> 
                <p className="col"><b>Descripcion: </b>{x.description}<hr/></p>
                <p className="col"><b>ID: :</b> {x.id}<hr/></p>
            <div className="col botonList">
            <button type="button" className="btn btn-danger" onClick={()=>eliminarCategoria(x)}>ELIMINAR</button>
            <button type="button" className="btn btn-warning" onClick={()=>{
                editarCategoria(x)
                setIdCategoria(x.id);  
                }}>EDITAR</button>
            </div>
            </div>
        )}
    </div>
    );
}

export default CatalogoCategories;
