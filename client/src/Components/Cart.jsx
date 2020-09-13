import {Link } from 'react-router-dom';
import React, { useEffect } from "react";
import { removeCart,getUser} from "../actions"
import { useSelector, useDispatch } from "react-redux";
import s from "./Cart.css";
// import Checkout from "./Checkout";
import Order from './Order';

// let carrito={
//   id:1,
//   amount: 5,
//   price:400,
//    product: {
//     id : 2,
//     name : "Zapa",
//     description : "re piola",
//     size : "43",
//     price : 500,
//     stock : 8,
//     image : "https://static.mercadoshops.com/zapatilla-salomon-speedcross-hombre-trail-running-v_iZ878255024XsZ230467303XpZ1XfZ230467303-23380324018-5XvZdxIM.jpg",
//   }   
// }
const Cart = (carrito) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);


  useEffect(() => {
    dispatch(getUser());
    // dispatch(getCartUser(1));
  }, []);


  // var total = cart.reduce(function(prev, cur) {
  //   return prev + (cur.product.price * cur.amount);
  // }, 0);

  return (
    <div className={s.container}>
      {cart &&
        cart.map((c) => (         
            <Order
              amount={c.amount}
              name={c.name}
              description={c.description}
              img={c.image}
              price={c.price}
              stock={c.stock}
              size={c.size}
              productId={c.id}
              userId={user.id}
            />
        ))}

      {/* <div className={s.subtotal}>
        <h2>TOTAL DE LA COMPRA</h2>
        <h3 className={s.price}>${total}</h3>
      </div>
      {total > 0 ? (
        <div className={s.flex}>
          <Link to={`/cart/checkout`}>
            <button className="btn btn-outline-success">REALIZAR COMPRA</button>
          </Link>
        </div>
      ) : null}
       <div>
        <Route
          exact
          path="/cart/checkout"
          render={() => <Checkout total={total} />}
        />
      </div>  */}
      { cart&&cart.length===0 ? 
      <div className="mt-4">
        <h1>Tu carrito está vacio!</h1>
        <h2><Link to="/products">Ir al cátalogo</Link></h2>
      </div> :
      <button className="btn btn-danger mt-4"
       onClick={()=>dispatch(removeCart(user.id))}>
         Vaciar Carrito
      </button>
    }
    </div>
  );
};

export default Cart;
