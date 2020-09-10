import React from 'react';
import { Route } from 'react-router-dom';
// import { useSelector } from "react-redux";
//import logo from './logo.svg';
import './App.css';
import Catalogo from "./Components/Catalogo"
import Product from './Components/Product.jsx';
// import CatalogFilter from './Components/CatalogFilter.jsx';
import NavBar from './Components/NavBar/NavBar.jsx';
import './Components/NavBar/NavBar.css';
import EditProduct from './Components/FormCRUD/EditProduct.jsx';
import FormCrud from "./Components/FormCRUD/FormCrud";
import UserCrud from "./Components/FormCRUD/UserCrud";
import FormCategory from './Components/FormCategory';
import Home from "./Components/Home";

import Cart from "./Components/Cart";

import Order from "./Components/Order";




function App() {
  // const products= useSelector(state => state.products)

  // function onFilterId(Id) {
  //   var productId = products.filter(products=> products.id == Id)
  //   if (productId !== undefined) {
  //     return productId [0];
  //   } else {
  //     return null;
  //   }
  // }

  // Scroll up (cuando le damos click al boton)

  document.getElementById("button-up").addEventListener("click", scrollUp);

  function scrollUp() {
    var currentScroll = document.documentElement.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(scrollUp);
      window.scrollTo(0, currentScroll - (currentScroll / 10));
      buttonUp.style.transform = "scale(0)";
    }
  }

  // --------------------------------------------- 
  //scroll para que aparezca el boton

  var buttonUp = document.getElementById("button-up");

  window.onscroll = function () {
    var scroll = document.documentElement.scrollTop;

    if (scroll > 500) {
      buttonUp.style.transform = "scale(1)";
    } else if (scroll < 500) {
      buttonUp.style.transform = "scale(0)";
    }
  }
  // -----------------------------------------------

  return (
    <div className="App">
      <NavBar />
      {/*<Route />*/}
      {/* <NavBar /> */}
      <Route
        exact path='/product'
        render={() => <Product />}
      />
      <Route
        exact path='/'
        render={() => <Home />}
      />

      {/* S14 : Crear Ruta para mostrar el componente Catalogo */}
      <Route
        exact path='/products'
        render={() => <Catalogo />}
      />
      {/* S15 : Crear Ruta para ver el detalle de un producto según el id. */}
      {<Route
        exact path='/products/:id'
        render={({ match }) => <Product productName={(match.params.id)} />}
      />}
      <Route
        exact path='/category'
        render={() => <FormCategory />}
      />

      <Route exact path="/formcrud" component={FormCrud} />
      <Route exact path="/users" component={UserCrud} />
      <Route exact path="/edit/product/:id" render={(match) => <EditProduct match={match} />} />
    <Route exact path="/edit/product/:id" render={(match)=><EditProduct match={match}/>} />
    <Route 
        exact path = '/cart'
          render = {() => <Cart />}
        
        />

        exact path='/products/:id'
        render={({ match }) => <Product productName={(match.params.id)} />}
      />}
      <Route
        exact path='/category'
        render={() => <FormCategory />}

      />

      <Route
        exact path='/order'
        render={() => <Order  />}

      />
      <Route exact path="/formcrud" component={FormCrud} />
      <Route exact path="/edit/product/:id" render={(match) => <EditProduct match={match} />} />




      {/* <Route
        exact path='/catalogFilter'
        render={() => <CatalogFilter />}
      /> */}

    </div>
  );
}

export default App;
