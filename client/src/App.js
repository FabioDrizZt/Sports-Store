import React from 'react';
import { Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import Product from './Components/Product.jsx'
import SearchBar from './Components/SearchBar.jsx'

function App() {
  return (
    <div className="App">
      <Route
        exact path='/Product'
        render={() => <Product />}
      />
      <Route
        exact path='/SearchBar'
        render={() => <SearchBar />}
      />
    </div>
  );
}

export default App;
