import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, updateOrder } from "../../actions";
import NavBarAdmin from '../NavBar/NavBarAdmin';
import "./OrdersTable.css"

function OrdersTable() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const [state, setState] = useState("")

  // useEffect(() => {
    
  // }, []);

  function mostrarOrdenes(state){
    dispatch(getOrders(state));
    setState(state)
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
                {state==="closed" ? <div className="botones"> <button className="btn btn-success btn-sm"
                style={{margin:0}}
                onClick={()=>{dispatch(updateOrder(cart.id,"open"))}}>abrir orden</button>
                <button className="btn btn-danger btn-sm"
                style={{margin:0}}
                onClick={()=>{dispatch(updateOrder(cart.id,"cancelled"))}}
                >cancelar orden</button> </div>: <div></div>
            }
             {state==="cancelled" ? <div className="botones"> <button className="btn btn-success btn-sm"
                style={{margin:0}}
                onClick={()=>{dispatch(updateOrder(cart.id,"open"))}}>abrir orden</button>
                <button className="btn btn-warning btn-sm"
                style={{margin:0}}
                onClick={()=>{dispatch(updateOrder(cart.id,"closed"))}}
                >cerrar orden</button> </div>: <div></div>
            }
             {state==="open" ? <div className="botones"> <button className="btn btn-warning btn-sm"
                style={{margin:0}}
                onClick={()=>{dispatch(updateOrder(cart.id,"closed"))}}>cerrar orden</button>
                <button className="btn btn-danger btn-sm"
                style={{margin:0}}
                onClick={()=>{dispatch(updateOrder(cart.id,"cancelled"))}}
                >cancelar orden</button> </div>: <div></div>
            }
               
            
		            <span><b>Cart Id: </b>{cart.id}</span>
		            <span><b>User Id: </b>{cart.userId}</span>
                <span><b>Estado: </b>{cart.state}</span>
                <p><span><b>Órdenes: </b></span>
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
