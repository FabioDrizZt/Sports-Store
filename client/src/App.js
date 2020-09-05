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
import CreateProduct from './Components/FormCRUD/CreateProduct.jsx';
import FormCrud from "./Components/FormCRUD/FormCrud"

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
  return (
    <div className="App">
   
      <NavBar />
    
   
      {/*<Route />*/}
      {/* <NavBar /> */}
      <Route
        exact path='/product'
        render={() => <Product />}
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
    <Route exact path="/formcrud" component={FormCrud} />
   

      {/* <Route
        exact path='/catalogFilter'
        render={() => <CatalogFilter />}
      /> */}

    </div>
  );
}

export default App;
