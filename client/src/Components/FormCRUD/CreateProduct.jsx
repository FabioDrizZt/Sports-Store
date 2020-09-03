import React from "react"

function CreateProduct (){
    return (
        <form method="POST" action="/products">
            <legend>Crear Producto</legend>
            <div className="form-group">
                <label for="name">Nombre</label> 
                <input type="text" id="name" name="name" />
            </div>
            <div className="form-group">
                <label for="description">Descripción</label> 
                <input type="text" id="description" name="description"/>
            </div>
            <div className="form-group">
               <label for="precio">Precio</label> 
                <input type="number" id="price" name="price" />
            </div>
            <div className="form-group">
               <label for="stock">Stock</label> 
                <input type="number" id="stock" name="stock" />
            </div>
            <div className="form-group">
               <label for="imagen">Imagen</label> 
                <input type="text" id="image" name="image"/>
            </div>
            <input type="submit" value="Crear"/>
        </form>
       
    )
}

export default CreateProduct