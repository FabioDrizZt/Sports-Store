import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../actions";
import NavBarAdmin from '../NavBar/NavBarAdmin';
import "./OrdersTable.css"

function OrdersTable() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  // useEffect(() => {
    
  // }, []);

  function mostrarOrdenes(state){
    dispatch(getOrders(state));
  }
 
  return ( 
    <div>
      <NavBarAdmin/>
        <div>
          <button className="btn btn-success" onClick={()=>mostrarOrdenes("open")}>Ordenes Abiertas</button>
          <button className="btn btn-warning" onClick={()=>mostrarOrdenes("closed")}>Ordenes Cerradas</button>
          <button className="btn btn-danger" onClick={()=>mostrarOrdenes("cancelled")}>Ordenes Canceladas</button>
        </div>       
        {
            orders&&orders.map(cart=>{
            return <div className="order-table col-6">
              <div>
		            <span><b>Cart Id: </b>{cart.id}</span>
		            <span><b>User Id: </b>{cart.userId}</span>
                <span><b>Estado: </b>{cart.state}</span>
                <p><b>Órdenes: </b>
                <span>		           
                  {cart.orders.map(order=>{
                  return <p>
                  <span><b>Id: </b>{order.id}</span>
                  <span><b>Producto Id: </b>{order.productId}</span>
                  <span><b>Cantidad: </b>{order.amount}</span>
                  <span><b>Precio: $</b>{order.price}</span>
                 </p>
                })}	              
              </span>       		
			        </p>      
		          </div>
              </div>
             })
          } 
    </div>
  );
};
export default OrdersTable;
