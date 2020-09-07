import React, {useEffect} from "react";
// import { Route, Link } from 'react-router-dom';
import ProductCard from "./ProductCard";
import { useSelector,useDispatch } from "react-redux";
import { getProduct } from "../actions";

// Este componente envia informacion al ProductCard que le dará una maquetacion de tarjeta...

const Product = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProduct(props.productName));
  }, []);

  return (
    <div>
      <div id="description" className="description">
        <div>
          <h2>{products.name}</h2>
          <p>{products.description}</p>
          <span>
            Precio: {products.price} / Stock: {products.stock}
          </span>
        </div>
        <div>
          <img src={products.image} />
        </div>
      </div>
    </div>
  );
};
export default Product;
