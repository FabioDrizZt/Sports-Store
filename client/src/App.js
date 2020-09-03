import React from 'react';
import { Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import Product from './Components/Product.jsx'
import NavBar from './Components/NavBar.jsx'
import CreateProduct from './Components/FormCRUD/CreateProduct.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route
        exact path='/Product'
        render={() => <Product />}
      />
      <CreateProduct />
    </div>
  );
}

export default App;
