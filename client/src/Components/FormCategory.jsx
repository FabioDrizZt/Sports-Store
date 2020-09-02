import React from 'react';

function FormCategory() {
    return (
        <form>
            <h3>Crear Categorias</h3>
            <label>Nombre de la Categoria</label>
            <div className="form-group">
                <label for="formGroupExampleInput">Nombre de la Categoria</label>
                <input type="text" className="form-control" id="nameCategory" placeholder="Ej. Zapatillas, Remeras, Botines, etc."/>

                <label for="formGroupExampleInput">Descripcion de la Categoria</label>
                <input type="text" className="form-control" id="descriptionCategory"/>

                <button type="submit" className="btn btn-primary">Agregar</button>
            </div>
        </form>        
    )
}