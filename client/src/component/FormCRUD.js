import React from "react";

function FormCRUD (){
return (
    <div>
        <form>
            <legend>Crear Producto</legend>
                <label for="name">Nombre</label> 
                <input type="text" id="name" name="name" />
                <label for="descripcion">Descripción</label> 
                <input type="text" id="descripcion" name="descripcion"/>
                <label for="categoria">Categoría</label> 
                <input type="text" id="categoria" name="categoria"/>
                <label for="precio">Precio</label> 
                <input type="number" id="precio" name="precio" />
                <label for="imagen">Imagen</label> 
                <input type="text" id="imagen" name="imagen"/>
                <input type="submit">Crear Producto</input>
        </form>
        <form>
            <legend>Editar Producto</legend>
                <label for="name">Nombre</label> 
                <input type="text" id="name" name="name" />
                <label for="descripcion">Descripción</label> 
                <input type="text" id="descripcion" name="descripcion"/>
                <label for="categoria">Categoría</label> 
                <input type="text" id="categoria" name="categoria"/>
                <label for="precio">Precio</label> 
                <input type="number" id="precio" name="precio" />
                <label for="imagen">Imagen</label> 
                <input type="text" id="imagen" name="imagen"/>
                <input type="submit">Editar Producto</input>
        </form>
        <form>
            <legend>Eliminar Producto</legend>
                <label for="idProduct">Id Producto</label> 
                <input type="text" id="idProduct" name="idProduct" />
                <input type="submit">Eliminar Producto</input>
        </form>
    </div>
    
)
}

export default FormCRUD