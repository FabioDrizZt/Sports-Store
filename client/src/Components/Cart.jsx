import { Route, Link } from 'react-router-dom';
import React, { useEffect } from "react";
import { getCartUser, getUser } from "../actions"
import { useSelector, useDispatch } from "react-redux";
import s from "./Cart.css";
import Checkout from "./Checkout";
// import Order from "./Order";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

/*   useEffect(() => {
    dispatch(getUser());
    dispatch(getCartUser(user.id));
  }, [getCartUser, getUser]); */

  var total = 125000 // aca va a tener q hacer un calculo 

  return (
    <div className={s.container}>
      {cart &&
        cart.map((c) => (            
          <div>Producto:</div>
          //   <Order
          //     amount={c.amount}
          //     name={c.product.name}
          //     img={c.product.image}
          //     price={c.product.price}
          //     stock={c.product.stock}
          //     size={c.product.size}
          //     productId={c.productId}
          //     userId={user.id}
          //   />
        ))}

      <div className={s.subtotal}>
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
      </div> 
    </div>
  );
};

export default Cart;
