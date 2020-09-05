import React from "react";
import "./CreateProduct.css";

function CreateProduct (){
    return (
        <form className="container" method="POST" action="http://localhost:3001/products">
            <legend>Crear Producto</legend>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label" for="name">Nombre</label> 
                <div class="col-sm-10">
                    <input className="form-control" type="text" id="name" name="name" placeholder="Zapatillas..."/>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label" for="description">Descripción</label> 
                <div class="col-sm-10">
                    <input className="form-control" type="text" id="description" name="description" placeholder="¿Qué dirias de tu producto?"/>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label" for="price">Precio</label> 
                <div class="col-sm-10">
                    <input className="form-control" type="number" id="price" name="price" placeholder=""/>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label" for="stock">Stock</label> 
                <div class="col-sm-10">
                    <input className="form-control" type="number" id="stock" name="stock" placeholder=""/>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label" for="size">Size</label> 
                <div class="col-sm-10">
                    <input className="form-control" type="text" id="size" name="size" placeholder=""/>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label" for="image">Imagen</label> 
                <div class="col-sm-10">
                    <input className="form-control" type="text" id="image" name="image" placeholder=""/>
                </div>
            </div>

            <button className="btn btn-primary" type="submit" value="Crear">ENVIAR</button>
        </form>
       
    )
}

export default CreateProduct


