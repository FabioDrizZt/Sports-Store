import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../actions";
import Cart from "./Cart";
import NavBarAdmin from './NavBar/NavBarAdmin';



function OrdersTable() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts);
  useEffect(() => {
    dispatch(getOrders("closed"));
  }, []);
  return ( 
    <div>
      <NavBarAdmin/>
    </div>
  );
};
export default OrdersTable;
