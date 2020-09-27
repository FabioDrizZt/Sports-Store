import React, { useEffect }from "react";
import { addtoCart, getOrders } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";

function Home(){
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);

    // Carrito LocalStore
    // Si no existe lo crea vacio
    JSON.parse(localStorage.getItem("myCart")) ??
    localStorage.setItem("myCart", JSON.stringify([]));
    // Guardamos los valores de las ordenes en la variable myCart como un arreglo
    const myCart = JSON.parse(localStorage.getItem("myCart"));

    useEffect(() => {
        dispatch(getOrders("abierta"));
        return () => {
            if (user.id && myCart.length >= 1 && cart.length === 0) {
                myCart.map((order) => {
                    dispatch(
                        addtoCart(user.id, {
                            productId: order.id,
                            price: order.product.price,
                            amount: order.amount,
                        })
                        );
                    });
                localStorage.setItem("myCart", JSON.stringify([]));
            }
        }
    }, []);

   return( 
    <div className="home"> 

    </div>
    )
}

export default Home