import React from "react";
import {createProductCategory} from "../../actions"
import {useDispatch} from "react-redux"

function AsignarProducto (){
    const dispatch=useDispatch();
    
    
    function asignar(e){
        const idProduct = document.getElementById("producto").value;
        const idCategoria = document.getElementById("categoria").value;
        e.preventDefault()
        dispatch(createProductCategory(idProduct,idCategoria))
    }


    return <div>
        <form onSubmit={(e)=>asignar(e)}>  
            <legend>Asignar categoria a producto</legend>
            <input type="text" name="idProduct" placeholder="Id producto" id="producto"/>
            <input type="text" name="idCategoria" placeholder="Id categoria" id="categoria"/>
            <button className="btn btn-primary">Asignar</button>
        </form>        
</div>
}

export default AsignarProducto