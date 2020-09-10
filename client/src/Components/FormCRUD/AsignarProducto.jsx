import React, { useState } from "react";
import {createProductCategory} from "../../actions"
import {useDispatch, useSelector} from "react-redux"

function AsignarProducto (){
    const dispatch=useDispatch();
    const productos = useSelector(state=>state.products);
    const categorias = useSelector(state=>state.categories);
    const [idProducto,setIdProducto] = useState();
    const [idCategoria,setIdCategoria] = useState()
    
    
    function asignar(e){             
        e.preventDefault()
        dispatch(createProductCategory(idProducto,idCategoria))
    }


    return <div>
        <form onSubmit={(e)=>asignar(e)}>  
            <legend>Asignar categoria a producto</legend>
            <label>Producto </label>
            <select onChange={(e) => setIdProducto(e.target.value)}>
            <option disabled seleted >Producto</option>
                {productos&&productos.map(x=>{
                    return <option key={x.id} value={x.id}>{x.name}</option>
                })}
            </select>
            <label>Categoria </label>
            <select onChange={(e) => setIdCategoria(e.target.value)}>
            <option disabled seleted >Categorias</option>
                {categorias&&categorias.map(x=>{
                    return <option key={x.id} value={x.id}>{x.name}</option>
                })}
            </select>
            
            <button className="btn btn-primary">Asignar</button>
        </form>        
</div>
}

export default AsignarProducto