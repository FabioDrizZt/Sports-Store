import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, getCategories, getCategoryProducts, createProduct } from "../actions";
import './AsigCate.css'
import FormCategory from "./FormCategory";
import CreateProduct from "./FormCRUD/CreateProduct";

// Importe useRef de react, agregue la constante draggingItem y el handleDragStart


export default function AsigCate () {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories);
    
    
    const draggingItem = useRef();
    const dragOverItem = useRef();

    useEffect(() => {
        function onDragEnd(evento) {
            console.log("hola")
        }
        window.addEventListener("dragend", onDragEnd);
    });
    
    function filtrarCatalogo(nombreCat) {
        dispatch(getCategoryProducts(nombreCat));
    }

    const handleDragStart = (e, position) => {
        draggingItem.current = position;
        console.log(e.target.innerHTML);
    };

    const handleDragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };

    const handleDragEnd = (e) => {
    const listCopy = [...products];
    const draggingItemContent = listCopy[draggingItem.current];
    listCopy.splice(draggingItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);
        
        draggingItem.current = null;
        dragOverItem.current = null;
        // setState(listCopy);
    };

    return (
        <React.Fragment>
        <div className="all"> 
            <div className="forms">
                <div className="productForm">
                    <CreateProduct />
                </div>
                <div className="categoryForm">
                    <FormCategory />
                </div>
            </div>
            <div className="asignacion">
            <div className="productsColum">
                <h1>Productos</h1>
                <select onChange={(e) => filtrarCatalogo(e.target.value)}>
                <option disabled seleted value>
                    FILTRAR POR CATEGORIA
                </option>
                {categories &&
                    categories.map((c) => {
                    return <option key={c.name}> {c.name} </option>;
                    })}
                </select>
                <button type="button" onClick={() => window.location.reload()}>
                Ver todos los productos
                </button>

                {/* Agregue un key al map para poder colocar la funcionalidad de drag, onDragStar, draggable  */}

                {products && products.map((x, index) => (
                    <ProductCard
                        key={x.id}
                        id={x.id}
                        titulo={x.name}
                        descripcion={x.description}
                        precio={x.price}
                        imagen={x.image}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnter={(e) => handleDragEnter(e, index)}
                        onDragEnd={handleDragEnd}
                        draggable
                    />
                ))}
            </div>
            <div className="categoriesColum">
                {/* Agregue un key al map para poder colocar la funcionalidad de drag, onDragStar, draggable  */}

                <h1>Listado de categorias</h1>
                {categories&&categories.map((x, index) =>
                <p key={x.id} onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnter={(e) => handleDragEnter(e, index)} onDragEnd={handleDragEnd}
                    draggable>
                    Nombre: {x.name} Descripcion: {x.description} <hr/>
                </p>)}     
            </div>
            </div>
        </div>
        </React.Fragment>
    )
}

// Que se necesita:
// 1.- Separar el FormCategory de las categorias ya creadas
// 2.- Que el FormCategory tenga el mismo estilo que el de crear producto.
// 3.- Borrar de arriba Precio / Stock