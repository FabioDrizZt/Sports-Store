import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import CreateProduct from '../src/Components/FormCRUD/CreateProduct';
import NavBar from '../src/Components/NavBar/NavBar';
import Product from './Components/Product.jsx';
import Products from './Components/Products.jsx';
import '../src/Components/NavBar/NavBar.css';
// import { useSelector } from 'react-redux';


const Routes = () => {

  const history = useHistory();

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
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={CreateProduct}/>
        <Route exact path='/' component={NavBar}/>
        <Route exact path='/product' render={() => Product}/>
        <Route exact path='/products' render={() => Products}/>
        {/* <Route
          exact path='/products/:id'
          render={({ match }) => <Product productName={onFilterId(match.params.id)} />}
        /> */}

      </Switch>
    </Router>
  )
}

export default Routes;