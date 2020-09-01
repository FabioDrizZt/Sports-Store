import React from "react";

function FormCRUD (){
return (
    <div>
        <form>
            <legend>Crear Producto</legend>
            <div class="form-group">
                <label for="name">Nombre</label> 
                <input type="text" id="name" name="name" />
            </div>
            <div class="form-group">
                <label for="descripcion">Descripción</label> 
                <input type="text" id="descripcion" name="descripcion"/>
            </div>
            <div class="form-group">
                <label for="categoria">Categoría</label> 
                <input type="text" id="categoria" name="categoria"/>
            </div>
            <div class="form-group">
               <label for="precio">Precio</label> 
                <input type="number" id="precio" name="precio" />
            </div>
            <div class="form-group">
               <label for="imagen">Imagen</label> 
                <input type="text" id="imagen" name="imagen"/>
            </div>
            <input type="submit" value="Crear"/>
        </form>
        <form>
            <legend>Editar Producto</legend>
            <div class="form-group">
                <label for="name">Nombre</label> 
                <input type="text" id="name" name="name" />
            </div>
            <div class="form-group">
                <label for="descripcion">Descripción</label> 
                <input type="text" id="descripcion" name="descripcion"/>
            </div>
            <div class="form-group">
                <label for="categoria">Categoría</label> 
                <input type="text" id="categoria" name="categoria" />
            </div>
            <div class="form-group">
               <label for="precio">Precio</label> 
                <input type="number" id="precio" name="precio"/>
            </div>
            <div class="form-group">
               <label for="imagen">Imagen</label> 
                <input type="text" id="imagen" name="imagen" />
            </div>
                <input type="submit" value="Editar"/>
        </form>
        <form>
            <legend>Eliminar Producto</legend>
                <div className="form-group">
                <label for="idProduct">Id Producto</label> 
                <input type="text" id="idProduct" name="idProduct" />
                </div>
               
                <input type="submit" value="Eliminar"/>
        </form>
    </div>
    
)
}

export default FormCRUD