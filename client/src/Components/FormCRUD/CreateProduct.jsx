import "./CreateProduct.css";
import { useDispatch } from "react-redux";
import { createProduct } from "../../actions/index";
import React, { useState } from "react";

function CreateProduct() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    size: "",
    image: "",
  });
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    size: "",
    image: "",
  });
  const handleInputChange = (e) => {
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  function submitProduct(e,input){
    e.preventDefault();
    dispatch(createProduct(input))
  }

  return (
    <div className="containerAll">
      <form className="containerPro" onSubmit={e=>submitProduct(e,input)}>
        <legend>Crear Producto</legend>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" for="name">
            Nombre
          </label>
          <div class="col-sm-10">
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              placeholder="Articulo deportivo..."
              value={input.name}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" for="description">
            Descripción
          </label>
          <div class="col-sm-10">
            <input
              className="form-control"
              type="text"
              id="description"
              name="description"
              placeholder="¿Qué dirias de tu producto?"
              value={input.description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" for="price">
            Precio
          </label>
          <div class="col-sm-10">
            <input
              className="form-control"
              type="number"
              id="price"
              name="price"
              placeholder=""
              value={input.price}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" for="stock">
            Stock
          </label>
          <div class="col-sm-10">
            <input
              className="form-control"
              type="number"
              id="stock"
              name="stock"
              placeholder=""
              value={input.stock}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" for="size">
            Size
          </label>
          <div class="col-sm-10">
            <input
              className="form-control"
              type="text"
              id="size"
              name="size"
              placeholder=""
              value={input.size}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" for="image">
            Imagen
          </label>
          <div class="col-sm-10">
            <input
              className="form-control"
              type="text"
              id="image"
              name="image"
              placeholder=""
              value={input.image}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* <div className="form-group">
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
              </div> */}
        <button className="btn btn-primary" type="submit" value="Crear">
          ENVIAR
        </button>
      </form>
    </div>
  );
}

export function validate({ name, description, price, stock, size, image }) {
  let errors = {};
  if (!name) {errors.name='Debe cargar el nombre'}
  if (!description) {errors.description='Debe cargar description'}
  if (!price) {errors.price='Debe cargar price'}
  if (!stock) {errors.stock='Debe cargar stock'}
  if (!size) {errors.size='Debe cargar size'}
  if (!image) {errors.image='Debe cargar image'}
  return errors;
}

export default CreateProduct;
