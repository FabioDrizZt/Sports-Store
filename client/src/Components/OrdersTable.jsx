import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartUser } from "../actions";
import Cart from "./Cart";



function OrdersTable() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);

    useEffect(() => {
      dispatch(getCartUser());
    }, []);


  return (
    
    <div>
      
      {orders && orders.map((x) => {
           return <Cart
              id = {x.id}
              name = {x.name}
              description = {x.description}
              size = {x.size}
              price = {x.price}
              amount = {x.amount}
              stock = {x.stock}
              image = {x.image}
          />
      })}
    </div>
  );
};
export default OrdersTable;
