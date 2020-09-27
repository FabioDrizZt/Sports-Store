import React, { useEffect } from "react";
import { addtoCart, getOrders } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
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
    };
  }, []);

return( 
    <Link to="/products">	
        <div>
        <div>
        <MDBContainer>
        <MDBCarousel activeItem={1} length={3} showControls={true} showIndicators={true} className="z-depth-1">
        <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
            <MDBView>
                <img className="d-block w-100 " src="https://www.decathlon.cl/modules/ps_imageslider/images/58da9df6d954063b69c67b4b047af5e00c98a652_respira-deporte-1.jpg" alt="First slide"/>
            <MDBMask overlay="black-light" />
            </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
            <MDBView>
                <img className="d-block w-100" src="https://www.decathlon.cl/modules/ps_imageslider/images/ab700f11761ed107e5088c43a3b7c9d99ded6ede_ACTIVADEPORTE-DECATHLON-DESKTOP.jpg" alt="Second slide"/>
            <MDBMask overlay="black-strong" />
            </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
            <MDBView>
                <img className="d-block w-100" src="https://www.decathlon.cl/modules/ps_imageslider/images/eded4df0afd840bb14c265c85881842a62ba3b6e_compra-segura.jpg" alt="Third slide"/>
            <MDBMask overlay="black-slight" />
            </MDBView>
            </MDBCarouselItem>
            </MDBCarouselInner>
            </MDBCarousel>
            </MDBContainer>
        </div>
        <div>
        </div></div>    
    </Link>	
    )
}

export default Home;
