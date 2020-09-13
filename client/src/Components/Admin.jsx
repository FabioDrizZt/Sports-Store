import React, { useEffect, useRef } from "react";
// import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import NavBarAdmin from '../Components/NavBar/NavBarAdmin';
import {
  // getProducts,
  // getCategories,
  getCategoryProducts
  // createProduct,
} from "../actions";
import "./Admin.css";
import FormCategory from "./FormCategory";
import FormCrud from "./FormCRUD/FormCrud";
// import CreateProduct from "./FormCRUD/CreateProduct";
// import Catalogo from "./Catalogo";
// import CatalogoCategories from "./CatalogoCategories";

// Importe useRef de react, agregue la constante draggingItem y el handleDragStart

export default function AsigCate() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  // const categories = useSelector((state) => state.categories);
  // const users = useSelector((state) => state.users);

  const draggingItem = useRef();
  const dragOverItem = useRef();

  useEffect(() => {
    function onDragEnd(evento) {
      console.log("hola");
    }
    window.addEventListener("dragend", onDragEnd);
  });

  // function filtrarCatalogo(nombreCat) {
  //   dispatch(getCategoryProducts(nombreCat));
  // }

  // const handleDragStart = (e, position) => {
  //   draggingItem.current = position;
  //   console.log(e.target.innerHTML);
  // };

  // const handleDragEnter = (e, position) => {
  //   dragOverItem.current = position;
  //   console.log(e.target.innerHTML);
  // };

  // const handleDragEnd = (e) => {
  //   const listCopy = [...products];
  //   const draggingItemContent = listCopy[draggingItem.current];
  //   listCopy.splice(draggingItem.current, 1);
  //   listCopy.splice(dragOverItem.current, 0, draggingItemContent);

  //   draggingItem.current = null;
  //   dragOverItem.current = null;
  //   // setState(listCopy);
  // };

  return (
    //porque hay que ir a catalogo para que aparezcan los productos?????
    //muestro los componentes para admin
    <React.Fragment>  
      <NavBarAdmin />

          
        
      {/* <div className="all">
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
          <Catalogo /> El catalogo es para mostar a los clientes, no deberia estar en admin
            Agregue un key al map para poder colocar la funcionalidad de drag, onDragStar, draggable  

             {products &&
              products.map((x, index) => (
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
             Agregue un key al map para poder colocar la funcionalidad de drag, onDragStar, draggable  
             <CatalogoCategories /> 

            <h1>Listado de categorias</h1>
            {categories &&
              categories.map((x, index) => (
                <p
                  key={x.id}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handleDragEnd}
                  draggable
                >
                  Nombre: {x.name} Descripcion: {x.description} <hr />
                </p>
              ))} 
           </div>
        </div>
      </div> */}
    </React.Fragment>
  );
}

// Que se necesita:
// 1.- Separar el FormCategory de las categorias ya creadas
// 2.- Que el FormCategory tenga el mismo estilo que el de crear producto.
// 3.- Borrar de arriba Precio / Stock
