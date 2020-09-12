import React, { useState, useEffect } from "react";
import { updateProduct } from "../../actions/index";
import { useDispatch } from "react-redux";

function EditProduct(props) {
    const dispatch = useDispatch();
    const idProduct = props.match.match.params.id;
    const [editProduct, setEditProduct] = useState(null);

    const [input, setInput] = useState(null);

    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
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
        dispatch(updateProduct(idProduct, input))
    }

    return (
        input && <div className="containerAll">
            <form className="containerPro" onSubmit={(e) => sendData(e)}>
                <legend >Editar Producto</legend>
                <div className="form-group row">
                    <label
                        className="col-sm-2 col-form-label" for="name">Nombre</label>
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
                    <label
                        className="col-sm-2 col-form-label"
                        for="description">Descripción</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="text"
                            id="description" name="description" value={input.description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        className="col-sm-2 col-form-label"
                        for="precio">Precio</label>
                    <div className="col-sm-2">
                        <input
                            className="form-control"
                            type="number"
                            id="price"
                            name="price"
                            value={input.price}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" for="stock">Stock</label>
                    <div class="col-sm-2">
                        <input
                            className="form-control"
                            type="number"
                            id="stock"
                            name="stock"
                            value={input.stock}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        className="col-sm-2 col-form-label"
                        for="imagen">Size</label>
                    <div class="col-sm-2">
                        <input
                            className="form-control"
                            type="text"
                            id="size"
                            name="size"
                            value={input.size}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        className="col-sm-2 col-form-label"
                        for="image">Imagen</label>
                    <div class="col-sm-10">
                        <input type="text" id="image"
                            name="image" value={input.image}
                            className="form-control"
                            type="text"
                            id="image"
                            name="image"
                            onChange={handleInputChange} />
                    </div>
                </div>
                <input type="submit" value="Editar" />
            </form>
        </div>
    );
}

export default EditProduct