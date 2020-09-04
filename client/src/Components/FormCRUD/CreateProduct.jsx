import React, { useState, useEffect } from "react";

function CreateProduct() {
  const [category, setCategory] = useState(null);

  return (
    <form method="POST" action="http://localhost:3001/products">

      <legend>Crear Producto</legend>
      <div className="form-group">
        <label for="name">Nombre</label>
        <input type="text" id="name" name="name" />
      </div>
      <div className="form-group">
        <label for="description">Descripción</label>
        <input type="text" id="description" name="description" />
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
        <label for="imagen">Size</label>
        <input type="text" id="size" name="size" />
      </div>

      <div className="form-group">
        <label for="imagen">Imagen</label>
        <input type="text" id="image" name="image" />
      </div>

      <div className="form-group">
        <label for="category">Categoría</label>
        <select>
          <option disabled seleted value>
            Filtrar por Categoría
          </option>
          {category &&
            category.map((c) => {
              return <option key={c.name}> {c.name} </option>;
            })}
        </select>
      </div>

      <input type="submit" value="Crear" />
    </form>
  );
}

export default CreateProduct;
