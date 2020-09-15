import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Catalogo from "./Components/Catalogo";
import Product from "./Components/Product.jsx";
import NavBar from "./Components/NavBar/NavBar.jsx";
import EditProduct from "./Components/FormCRUD/EditProduct.jsx";
import FormCrud from "./Components/FormCRUD/FormCrud";
import UserCrud from "./Components/FormCRUD/UserCrud";
import FormCategory from "./Components/FormCategory";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Order from "./Components/Order";
import Admin from "./Components/Admin";
import Login from "./Components/Login";
import OrdersTable from "./Components/OrderTable/OrdersTable";
import CreateProduct from './Components/FormCRUD/CreateProduct';
import Productok from './Components/ProductOk/Productok'

function App() {
  const scroll = document.documentElement.scrollTop;
  const buttonUp = document.getElementById("button-up");
  buttonUp.addEventListener("click", scrollUp);

  function scrollUp() {
    if (scroll > 0) {
      window.requestAnimationFrame(scrollUp);
      window.scrollTo(0, scroll - scroll / 10);
      buttonUp.style.transform = "scale(0)";
    }
  }

  window.onscroll = () => {
    (document.documentElement.scrollTop > 500) ? buttonUp.style.transform = "scale(1)" : buttonUp.style.transform = "scale(0)";
  };

  return (
    <div className="App">
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/category" component={FormCategory} />
      <Route exact path="/formcrud" component={FormCrud} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/order" component={Order} />
      <Route exact path="/products/:id" render={(match) => <Product match={match} />} />
      <Route exact path="/products" component={Catalogo} />
      <Route exact path="/users" component={UserCrud} />
      {/* RUTAS DEL ADMINISTRADOR */}
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/admin/categories" component={FormCategory} />
      <Route exact path="/admin/edit/product/:id" render={(match) => <EditProduct match={match} />} />
      <Route exact path="/admin/myProducts" component={FormCrud} />
      <Route exact path="/admin/newProduct" component={CreateProduct} />
      <Route exact path="/admin/orders" component={OrdersTable} />
      <Route exact path="/admin/productok" component={Productok} />
    </div>
  );
}

export default App;
