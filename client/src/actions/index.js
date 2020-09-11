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
export const CLOSE_CART = "CLOSE_CART"
// aca van los actions del DELETE/REMOVE
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const REMOVE_PRODUCT_CATEGORY = "REMOVE_PRODUCT_CATEGORY";
export const REMOVE_CART = "REMOVE_CART";
export const REMOVE_USER = "REMOVE_USER";

export function getProduct(id) {
  return function (dispatch) {
    axios
      .get(`${SERVER_ADDRESS}/products/${id}`)
      .then((res) => {
        dispatch({ type: GET_PRODUCT, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function getProducts() {
  return function (dispatch) {
    axios
      .get(`${SERVER_ADDRESS}/products`)
      .then((res) => {
        dispatch({ type: GET_PRODUCTS, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function getCategories() {
  return function (dispatch) {
    axios
      .get(`${SERVER_ADDRESS}/products/categories`)
      .then((res) => {
        dispatch({ type: GET_CATEGORIES, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function getCategoryProducts(nombreCat) {
  return function (dispatch) {
    axios
      .get(`${SERVER_ADDRESS}/products/category/${nombreCat}`)
      .then((res) => {
        dispatch({ type: GET_CATEGORY_PRODUCTS, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function getOrder(id) {
  return function (dispatch) {
    axios
      .get(`${SERVER_ADDRESS}/order/${id}`)
      .then((res) => {
        dispatch({ type: GET_ORDER, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function getOrders(value) {
  return function (dispatch) {
    axios
      .get(`${SERVER_ADDRESS}/orders/?status=${value}`)
      .then((res) => {
        dispatch({ type: GET_ORDERS, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function searchProducts(value) {
  return function (dispatch) {
    axios
      .get(`${SERVER_ADDRESS}/products/search/?query=${value}`)
      .then((res) => {
        dispatch({ type: SEARCH_PRODUCTS, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function getCartUser(id) {
  return function (dispatch) {
    axios
      .get(`${SERVER_ADDRESS}/users/${id}/cart`)
      .then((res) => {
        dispatch({ type: GET_CARTUSER, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function getUser() {
  return  function (dispatch) {
    /* axios
      .get(`${SERVER_ADDRESS}/users/me`)
      .then((res) => { */
        dispatch({ type: GET_USER }); // dispatch({ type: GET_USER, payload: res.data });

      /* })
      .catch((error) => alert(error, "error")); */
  };
}
export function getUsers(id) {
  return function (dispatch) {
    axios
      .get(`${SERVER_ADDRESS}/users`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function createProduct(input) {
  return function (dispatch) {
    axios
      .post(`${SERVER_ADDRESS}/products/`, input)
      .then((res) => {
        dispatch({ type: CREATE_PRODUCT, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function createUser(input) {
  return function (dispatch) {
    axios
      .post(`${SERVER_ADDRESS}/users/`, input)
      .then((res) => {
        dispatch({ type: CREATE_USER, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function createCategory(input) {
  console.log(input);
  return function (dispatch) {
    axios
      .post(`${SERVER_ADDRESS}/products/category`, input)
      .then((res) => {
        dispatch({ type: CREATE_CATEGORY, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function createProductCategory(idProducto, idCategoria) {
  console.log(idProducto, idCategoria);
  return function (dispatch) {
    axios
      .post(`${SERVER_ADDRESS}/products/${idProducto}/category/${idCategoria}`)
      .then((res) => {
        dispatch({ type: CREATE_PRODUCT_CATEGORY, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function addtoCart(idUsuario,product) {
  return function (dispatch) {
    axios
      .post(`${SERVER_ADDRESS}/users/${idUsuario}/cart`,product)
      .then((res) => {
        dispatch({ type: ADD_TO_CART, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function updateProduct(id, input) {
  return function (dispatch) {
    axios
      .put(`${SERVER_ADDRESS}/products/${id}`, input)
      .then((res) => {
        dispatch({ type: UPDATE_PRODUCT, payload: res.data });
      })
      .then(() => alert("Se modifico el prodcto"))

      .catch((error) => alert(error, "error"));
  };
}
export function updateCategory(id, input) {
  return function (dispatch) {
    axios
      .put(`${SERVER_ADDRESS}/products/category/${id}`, input)
      .then((res) => {
        dispatch({
          type: UPDATE_CATEGORY,
          payload: { id: id, name: input.name, description: input.description },
        });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function updateUser(id, input) {
  return function (dispatch) {
    axios
      .put(`${SERVER_ADDRESS}/users/${id}`, input)
      .then((res) => {
        dispatch({ type: UPDATE_USER, payload: res.data });
      })
      .then(() => alert("Se modifico el usuario"))
      .catch((error) => alert(error, "error"));
  };
}
export function updateOrderAmount(idUser, input) {
  return function (dispatch) {
    axios
      .put(`${SERVER_ADDRESS}/users/${idUser}/cart/`, input)
      .then((res) => {
        dispatch({
          type: UPDATE_ORDER_AMOUNT,
          payload: { amount: input.amount },
        });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function updateOrder(id, input) {
  return function (dispatch) {
    axios
      .put(`${SERVER_ADDRESS}/orders/${id}`, input)
      .then((res) => {
        dispatch({ type: UPDATE_ORDER, payload: res.data });
      })
      .then(() => alert("Se modifico la orden"))
      .catch((error) => alert(error, "error"));
  };
}
export function closeCart(id) {
  return function (dispatch) {
    axios
      .patch(`${SERVER_ADDRESS}/orders/${id}`)
      .then((res) => {
        dispatch({ type: CLOSE_CART, payload: id });
      })
      .then(() => alert("Se cerro el carrito"))
      .catch((error) => alert(error, "error"));
  };
}
export function removeProduct(id) {
  return function (dispatch) {
    return axios
      .delete(`${SERVER_ADDRESS}/products/${id}`)
      .then((res) => {
        dispatch({ type: REMOVE_PRODUCT, payload: id });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function removeCategory(id) {
  return function (dispatch) {
    return axios
      .delete(`${SERVER_ADDRESS}/products/category/${id}`)
      .then((res) => {
        dispatch({ type: REMOVE_CATEGORY, payload: id });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function removeProductCategory(idProducto, idCategoria) {
  return function (dispatch) {
    return axios
      .delete(`${SERVER_ADDRESS}/product/${idProducto}/categories/${idCategoria}`)
      .then((res) => {
        dispatch({ type: REMOVE_PRODUCT_CATEGORY, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function removeCart(idUsuario) {
  return function (dispatch) {
    axios
      .delete(`${SERVER_ADDRESS}/users/${idUsuario}/cart`)
      .then((res) => {
        dispatch({ type: REMOVE_CART, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  };
}
export function removeUser(idUsuario) {
  return function (dispatch) {
    axios
      .delete(`${SERVER_ADDRESS}/users/${idUsuario}`)
      .then((res) => {
        dispatch({ type: REMOVE_USER, payload: res.data });
      })
      .catch((error) => alert(error, "error"));
  }

}
