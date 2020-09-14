import axios from "axios";
const SERVER_ADDRESS = "http://localhost:3001";

// aca van los actions del GET
export const GET_PRODUCT = "GET_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_CATEGORY_PRODUCTS = "GET_CATEGORY_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_ORDER = "GET_ORDER";
export const GET_ORDERS = "GET_ORDERS";
export const GET_CARTUSER = "GET_CARTUSER";
export const GET_USER = "GET_USER";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const GET_USERS = "GET_USERS";
// aca van los actions del POST/CREATE
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const CREATE_USER = "CREATE_USER";
export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const CREATE_PRODUCT_CATEGORY = "CREATE_PRODUCT_CATEGORY";
export const ADD_TO_CART = "ADD_TO_CART";
// aca van los actions del UPDATE/MODIFICAR
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_ORDER_AMOUNT = "UPDATE_ORDER_AMOUNT";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const PROMOTE_USER = "PROMOTE_USER";
export const CLOSE_CART = "CLOSE_CART"
// aca van los actions del DELETE/REMOVE
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const REMOVE_PRODUCT_CATEGORY = "REMOVE_PRODUCT_CATEGORY";
export const REMOVE_CART = "REMOVE_CART";
export const REMOVE_USER = "REMOVE_USER";
export const REMOVE_ORDER = "REMOVE_ORDER";

//S24 : Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles
export function getProduct(productId) {
  return function (dispatch) {
    axios.get(`${SERVER_ADDRESS}/products/${productId}`)
      .then((res) => {
        dispatch({ type: GET_PRODUCT, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}// S21 : Crear ruta que devuelva todos los productos
export function getProducts() {
  return function (dispatch) {
    axios.get(`${SERVER_ADDRESS}/products`)
      .then((res) => {
        dispatch({ type: GET_PRODUCTS, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}// S21 : Crear ruta que devuelva todas las categories
export function getCategories() {
  return function (dispatch) {
    axios.get(`${SERVER_ADDRESS}/products/categories`)
      .then((res) => {
        dispatch({ type: GET_CATEGORIES, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}//S22 : Crear Ruta que devuelva los productos de X categoria    *******Falla*********
export function getCategoryProducts(categoryName) {
  return function (dispatch) {
    axios.get(`${SERVER_ADDRESS}/products/category/${categoryName}`)
      .then((res) => {
        dispatch({ type: GET_CATEGORY_PRODUCTS, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}//S46 : Crear Ruta que retorne una orden en particular. GET /orders/:id
export function getOrder(orderId) {
  return function (dispatch) {
    axios.get(`${SERVER_ADDRESS}/orders/${orderId}`)
      .then((res) => {
        dispatch({ type: GET_ORDER, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}// S44 : Crear ruta que retorne todas las ordenes
export function getOrders(cartState) {
  return function (dispatch) {
    axios.get(`${SERVER_ADDRESS}/orders/?status=${cartState}`)
      .then((res) => {
        dispatch({ type: GET_ORDERS, payload: res.data });
      }).catch((error) => alert(error, "error"));
  }
};
//S23: Crear ruta que retorne productos segun el keyword de búsqueda
export function searchProducts(value) {
  return function (dispatch) {
    axios.get(`${SERVER_ADDRESS}/products/search/?query=${value}`)
      .then((res) => {
        dispatch({ type: SEARCH_PRODUCTS, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}//S39 : Crear Ruta que retorne todos los items del Carrito
export function getCartUser(userId) {
  return function (dispatch) {
    axios.get(`${SERVER_ADDRESS}/users/${userId}/cart`)
      .then((res) => {
        dispatch({ type: GET_CARTUSER, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function getUser() {
  return function (dispatch) {
    /* axios
      .get(`${SERVER_ADDRESS}/users/me`)
      .then((res) => { */
    dispatch({ type: GET_USER }); // dispatch({ type: GET_USER, payload: res.data });

    /* })
    .catch((error) => alert(error, "error")); */
  };
}// S36 : Crear Ruta que retorne todos los Usuarios
export function getUsers() {
  return function (dispatch) {
    axios.get(`${SERVER_ADDRESS}/users/`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}// S17 : Crear ruta para agregar categorias de un producto.
export function createProduct(product) {
  return function (dispatch) {
    axios.post(`${SERVER_ADDRESS}/products/`, product)
      .then((res) => {
        dispatch({ type: CREATE_PRODUCT, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}//S34 ruta para crear usuario
export function createUser(user) {
  return function (dispatch) {
    axios.post(`${SERVER_ADDRESS}/users/`, user)
      .then((res) => {
        dispatch({ type: CREATE_USER, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}// S18 : Crear ruta para crear/agregar Categoria
export function createCategory(category) {
  return function (dispatch) {
    axios.post(`${SERVER_ADDRESS}/products/category`, category)
      .then((res) => {
        dispatch({ type: CREATE_CATEGORY, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}// S17 : Crear ruta para agregar categorias de un producto.
export function createProductCategory(productId, categoryId) {
  return function (dispatch) {
    axios.post(`${SERVER_ADDRESS}/products/${productId}/category/${categoryId}`)
      .then((res) => {
        dispatch({ type: CREATE_PRODUCT_CATEGORY, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}// S38 : Crear Ruta para agregar Item al Carrito
export function addtoCart(userId, product) {
  return function (dispatch) {
    axios.post(`${SERVER_ADDRESS}/users/${userId}/cart`, product)
      .then((res) => {
        console.log(res.data);
        (res.data) ? dispatch({ type: ADD_TO_CART, payload: res.data }) : (alert("Producto ya existente en el carrito"));
      })
      .catch((error) => alert(error, "error"));
  };
}//S26 : Crear ruta para Modificar Producto
export function updateProduct(product) {
  return function (dispatch) {
    axios.put(`${SERVER_ADDRESS}/products/${product.id}`, product)
      .then((res) => {
        dispatch({ type: UPDATE_PRODUCT, payload: product });
      }).then(() => alert("Se modifico el producto"))
      .catch((error) => alert(error, "error"));
  };
}//S20 : Crear ruta para Modificar Categoria
export function updateCategory(id, input) {
  return function (dispatch) {
    axios.put(`${SERVER_ADDRESS}/products/category/${id}`, input)
      .then(res => {
        dispatch({ type: UPDATE_CATEGORY, payload: { id: id, name: input.name, description: input.description } });
      }).catch(error => alert(error, 'error'))
  }
}
// S35 : Crear Ruta para modificar Usuario
export function updateUser(user) {
  return function (dispatch) {
    axios.put(`${SERVER_ADDRESS}/users/${user.id}`, user)
      .then((res) => {
        dispatch({ type: UPDATE_USER, payload: user });
      }).then(() => alert("Se modifico el usuario"))
      .catch((error) => alert(error, "error"));
  };
}// S41 : Crear Ruta para editar las cantidades del carrito
export function updateOrderAmount(userId, order) {
  return function (dispatch) {
    axios.put(`${SERVER_ADDRESS}/users/${userId}/cart/`, order)
      .then((res) => {
        dispatch({ type: UPDATE_ORDER_AMOUNT, payload: order });
      }).then(() => alert("Se cambio la cantidad"))
      .catch((error) => alert(error, "error"));
  };
}//S47 : Crear Ruta para modificar una Orden
export function updateOrder(orderId,state) {
  return function (dispatch) {
    axios.put(`${SERVER_ADDRESS}/orders/${orderId}`, {state:state})
      .then((res) => {    
        console.log(res.data)
        dispatch({ type: UPDATE_ORDER, payload: orderId });
      }).then(() => console.log("Se modifico la orden"))
      .catch((error) => alert(error, "error"));
  };
}//SXX : Crear Ruta para Cerrar un Carrito


//S67 : Crear ruta /promote
// POST /auth/promote/:id
// Promote convierte al usuario con ID: id a Admin.
export function promoteUser(id){
  return function (dispatch){
    axios.put(`${SERVER_ADDRESS}/auth/promote/${id}`)
    dispatch({type: PROMOTE_USER, payload: id})
  }.then (() => alert ("Se cambio correctamente"))
  .catch((error) => alert ("Falló la modificacioin"))
}

export function closeCart(cartId) {
  return function (dispatch) {
    axios.patch(`${SERVER_ADDRESS}/orders/${cartId}`)
      .then((res) => {
        dispatch({ type: CLOSE_CART, payload: cartId });
      }).then(() => alert("Se cerro el carrito"))
      .catch((error) => alert(error, "error"));
  };
}// S27 eliminar un producto DELETE /products/:id
export function removeProduct(productId) {
  return function (dispatch) {
    axios.delete(`${SERVER_ADDRESS}/products/${productId}`)
      .then((res) => {
        dispatch({ type: REMOVE_PRODUCT, payload: productId });
      }).then(() => alert("Se elimino el producto"))
      .catch((error) => alert(error, "error"));
  };
}//S19 : Crear Ruta para eliminar Categoria
export function removeCategory(categoryId) {
  return function (dispatch) {
    axios.delete(`${SERVER_ADDRESS}/products/category/${categoryId}`)
      .then((res) => {
        dispatch({ type: REMOVE_CATEGORY, payload: categoryId });
      }).then(() => console.log("Se elimino la categoria"))
      .catch((error) => alert(error, "error"));
  };
}// S17 : Crear ruta para sacar categorias de un producto.
export function removeProductCategory(productId, categoryId) {
  return function (dispatch) {
    axios.delete(`${SERVER_ADDRESS}/products/${productId}/category/${categoryId}`)
      .then((res) => {
        dispatch({ type: REMOVE_PRODUCT_CATEGORY, payload: res.data });
      }).then(() => alert("Se le elimino la categoria al producto"))
      .catch((error) => alert(error));
  };
}// S40 : Crear Ruta para vaciar el carrito
export function removeCart(userId) {
  return function (dispatch) {
    axios.delete(`${SERVER_ADDRESS}/users/${userId}/cart`)
      .then((res) => {
        dispatch({ type: REMOVE_CART, payload: res.data });
        console.log(res.data.message)
      })
      .catch((error) => alert(error, "error"));
  };
}// S37 : Crear Ruta para eliminar Usuario DELETE /users/:id
export function removeUser(userId) {
  return function (dispatch) {
    axios.delete(`${SERVER_ADDRESS}/users/${userId}`)
      .then((res) => {
        dispatch({ type: REMOVE_USER, payload: userId });
      }).then(() => alert("Se elimino el usuario"))
      .catch((error) => alert(error, "error"));
  }
}
// Eliminar una orden del carrito
export function removeOrder(orderId) {
  return function (dispatch) {
    axios.delete(`${SERVER_ADDRESS}/orders/${orderId}`)
      .then((res) => {
        dispatch({ type: REMOVE_ORDER, payload: orderId });
      }).then(() => alert("Se elimino la orden del carrito satisfactoriamente"))
      .catch((error) => alert(error, "error"));
  }
}
