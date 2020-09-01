import React from "react"

function deleteProduct (){
    return(
        <form>
        <legend>Eliminar Producto</legend>
            <div className="form-group">
            <label for="idProduct">Id Producto</label> 
            <input type="text" id="idProduct" name="idProduct" />
            </div>
           
            <input type="submit" value="Eliminar"/>
    </form>
    )
}

export default deleteProduct