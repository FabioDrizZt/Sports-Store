import React, { useState } from "react";
import {removeProductCategory} from "../../actions"
import {useDispatch, useSelector} from "react-redux"

function EliminarAsignacion (){
    const dispatch=useDispatch();
    const productos = useSelector(state=>state.products);
    const categorias = useSelector(state=>state.categories);
    const [idProducto,setIdProducto] = useState();
    const [idCategoria,setIdCategoria] = useState()
    
    
    function eliminar(e){             
        e.preventDefault();   
        alert("Eliminado producto "+idProducto+" de categoria:"+idCategoria)    
        dispatch(removeProductCategory(idProducto,idCategoria))
    }


    return <div>
        <form onSubmit={(e)=>eliminar(e)}>  
            <legend>Eliminar categoria a producto</legend>           
            <select onChange={(e) => setIdProducto(e.target.value)} className="m-2">
            <option disabled selected>Producto</option>
                {productos&&productos.map(x=>{                 
                    return <option key={x.id+0.2} value={x.id}>{x.name}</option>
                })}
            </select>          
            <select onChange={(e) => setIdCategoria(e.target.value)} className="m-2">
            <option disabled selected>Categorias</option>
                {categorias&&categorias.map(x=>{
                    return <option key={x.id+0.1} value={x.id}>{x.name}</option>
                })}
            </select>
            
            <button className="btn btn-danger">Eliminar</button>
        </form>        
</div>
}

export default EliminarAsignacion