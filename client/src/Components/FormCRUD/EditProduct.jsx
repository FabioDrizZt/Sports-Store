import React, { useState, useEffect } from "react";
import { updateProduct } from "../../redux/actions/index";
import { useDispatch } from "react-redux";
import NavBarAdmin from "../NavBar/NavBarAdmin";
import "../FormCRUD/CreateProduct.css";
function EditProduct(props) {
  const dispatch = useDispatch();
  const idProduct = props.match.match.params.id;

  const [input, setInput] = useState(null);

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    fetch("http://localhost:3001/products/" + idProduct)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setInput(data);
      });
  }, []);

  function sendData(e) {
    e.preventDefault();
    dispatch(updateProduct(idProduct, input));
  }

  return (
    input && (
      <>
        <NavBarAdmin />
        <div className="containerAll">
          <form className="containerPro" onSubmit={(e) => sendData(e)}>
            <legend>Editar Producto</legend>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" for="name">
                Nombre
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" for="description">
                Descripción
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="description"
                  name="description"
                  value={input.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label" for="precio">
                Precio
              </label>
              <div className="col-sm-2">
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  id="price"
                  name="price"
                  value={input.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="stock" className="col-sm-2 col-form-label">
                Stock
              </label>
              <div class="col-sm-2">
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  id="stock"
                  name="stock"
                  value={input.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" for="imagen">
                Talle
              </label>
              <div className="col-sm-2">
                <input
                  className="form-control"
                  type="text"
                  id="size"
                  name="size"
                  value={input.size}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label" for="imagen">
                Imagen
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="image"
                  name="image"
                  value={input.image}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              value="Crear"
              style={{ margin: 0 }}
            >
              Editar
            </button>
          </form>
        </div>
      </>
    )
  );
}

export default EditProduct;
