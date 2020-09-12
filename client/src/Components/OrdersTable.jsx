import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../actions";
import Cart from "./Cart";



function OrdersTable() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts);
  useEffect(() => {
    dispatch(getOrders("closed"));
  }, []);
  return ( 
    <div>
      {carts && carts.map((x) => {
              
              {/* <Cart
              id = {x.id}
              /> */}
        
      })}
    </div>
  );
};
export default OrdersTable;
