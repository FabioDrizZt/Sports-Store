import axios from "axios";
import * as C from './constants'
axios.defaults.withCredentials = true;

//S24 : Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles

export function getUserSession() {
  return function (dispatch) {
    axios.get(`${C.SERVER_ADDRESS}`)
      .then((res) => { dispatch({ type: C.USER_SESSION, payload: res.data }) })
      .catch((error) => alert(error, "error"))
  }
}

export function getProduct(productId) {
  return function (dispatch) {
    axios.get(`${C.SERVER_ADDRESS}/products/${productId}`)
      .then((res) => { dispatch({ type: C.GET_PRODUCT, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}// S21 : Crear ruta que devuelva todos los productos
export function getProducts() {
  return function (dispatch) {
    axios.get(`${C.SERVER_ADDRESS}/products`)
      .then((res) => { dispatch({ type: C.GET_PRODUCTS, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}// S21 : Crear ruta que devuelva todas las categories
export function getCategories() {
  return function (dispatch) {
    axios.get(`${C.SERVER_ADDRESS}/products/categories`)
      .then((res) => { dispatch({ type: C.GET_CATEGORIES, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}//S22 : Crear Ruta que devuelva los productos de X categoria    *******Falla*********
export function getCategoryProducts(categoryName) {
  return function (dispatch) {
    axios.get(`${C.SERVER_ADDRESS}/products/category/${categoryName}`)
      .then((res) => { dispatch({ type: C.GET_CATEGORY_PRODUCTS, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}//S46 : Crear Ruta que retorne una orden en particular. GET /orders/:id
export function getOrder(orderId) {
  return function (dispatch) {
    axios.get(`${C.SERVER_ADDRESS}/orders/${orderId}`)
      .then((res) => { dispatch({ type: C.GET_ORDER, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}// S44 : Crear ruta que retorne todas las ordenes
export function getOrders(cartState) {
  return function (dispatch) {
    axios.get(`${C.SERVER_ADDRESS}/orders/?status=${cartState}`)
      .then((res) => { dispatch({ type: C.GET_ORDERS, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}//S23: Crear ruta que retorne productos segun el keyword de búsqueda
export function searchProducts(value) {
  return function (dispatch) {
    axios.get(`${C.SERVER_ADDRESS}/products/search/?query=${value}`)
      .then((res) => { dispatch({ type: C.SEARCH_PRODUCTS, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}//S39 : Crear Ruta que retorne todos los items del Carrito
export function getCartUser(userId) {
  return function (dispatch) {
    axios.get(`${C.SERVER_ADDRESS}/users/${userId}/cart`)
      .then((res) => { dispatch({ type: C.GET_CARTUSER, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
} export function getUser() {
  return function (dispatch) {
    /* axios
      .get(`${C.SERVER_ADDRESS}/users/me`)
      .then((res) => { */
    dispatch({ type: C.GET_USER }); // dispatch({ type: C.GET_USER, payload: res.data });
    /* })
    .catch((error) => alert(error, "error")); */
  }
}// S36 : Crear Ruta que retorne todos los Usuarios
export function getUsers() {
  return function (dispatch) {
    axios.get(`${C.SERVER_ADDRESS}/users/`)
      .then((res) => { dispatch({ type: C.GET_USERS, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}//S57 : Crear Ruta para obtener todas las reviews de un producto.
export function getReviews(id) {
  return function (dispatch) {
    axios.get(`${C.SERVER_ADDRESS}/products/${id}/review/`)
      .then((res) => { dispatch({ type: C.GET_REVIEWS, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}//S65 : Crear ruta auth/me
export function getMe() {
  return function (dispatch) {
    axios.get(`${C.SERVER_ADDRESS}/auth/me`)
      .then((res) => { dispatch({ type: C.GET_ME, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
} export function userLogin(input) {
  return function (dispatch) {
    axios.post(`${C.SERVER_ADDRESS}/auth/login`, input)
      .then((res) => {
        dispatch({ type: C.USER_LOGIN, payload: res.data });
      })
      .catch((error) => alert("Usuario o Contraseña Incorrecta"));
      
  }
}// S64 crear ruta de logout
export function userLogout() {
  return function (dispatch) {
    axios.post(`${C.SERVER_ADDRESS}/auth/logout`)
      .then((res) => { dispatch({ type: C.USER_LOGOUT/*, payload: res.data*/ }) });
  }
}// S17 : Crear ruta para agregar categorias de un producto.
export function createProduct(product) {
  return function (dispatch) {
    axios.post(`${C.SERVER_ADDRESS}/products/`, product)
      .then((res) => { dispatch({ type: C.CREATE_PRODUCT, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  };
}//S34 ruta para crear usuario
export function createUser(user) {
  return function (dispatch) {
    axios.post(`${C.SERVER_ADDRESS}/users/`, user)
      .then((res) => { dispatch({ type: C.CREATE_USER, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}// S18 : Crear ruta para crear/agregar Categoria
export function createCategory(category) {
  return function (dispatch) {
    axios.post(`${C.SERVER_ADDRESS}/products/category`, category)
      .then((res) => { dispatch({ type: C.CREATE_CATEGORY, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}// S17 : Crear ruta para agregar categorias de un producto.
export function createProductCategory(productId, categoryId) {
  console.log(productId,categoryId)
  return function (dispatch) {
    axios.post(`${C.SERVER_ADDRESS}/products/${productId}/category/${categoryId}`)
      .then((res) => { dispatch({ type: C.CREATE_PRODUCT_CATEGORY, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}// S38 : Crear Ruta para agregar Item al Carrito
export function addtoCart(userId, product) {
  return function (dispatch) {
    axios.post(`${C.SERVER_ADDRESS}/users/${userId}/cart`, product)
      .then((res) => {
        (res.data) ? dispatch({ type: C.ADD_TO_CART, payload: res.data })
          : (alert("Producto ya existente en el carrito"));
      })
      .catch((error) => alert(error, "error"));
  }
}// S54 : Crear ruta para crear/agregar Review
export function createReview(review) {
  return function (dispatch) {
    axios.post(`${C.SERVER_ADDRESS}/products/${review.productId}/review`, review)
      .then((res) => { dispatch({ type: C.CREATE_REVIEW, payload: review }) })
      .catch((error) => alert(error, "error"));
  }
} export function createLogin() {
  return function (dispatch) {
    axios.post(`${C.SERVER_ADDRESS}/auth/`)
      .then((res) => { dispatch({ type: C.CREATE_LOGIN, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}//S26 : Crear ruta para Modificar Producto
export function updateProduct(productId, product) {
  return function (dispatch) {
    axios.put(`${C.SERVER_ADDRESS}/products/${productId}`, product)
      .then((res) => { dispatch({ type: C.UPDATE_PRODUCT, payload: product }) })
      .then(() => console.log("Se modifico el producto"))
      .catch((error) => alert(error, "error"));
  }
}//S20 : Crear ruta para Modificar Categoria
export function updateCategory(id, input) {
  return function (dispatch) {
    axios.put(`${C.SERVER_ADDRESS}/products/category/${id}`, input)
      .then(res => { dispatch({ type: C.UPDATE_CATEGORY, payload: { id: id, name: input.name, description: input.description } }) })
      .catch(error => alert(error, 'error'))
  }
}// S35 : Crear Ruta para modificar Usuario
export function updateUser(user) {
  return function (dispatch) {
    axios.put(`${C.SERVER_ADDRESS}/users/${user.id}`, user)
      .then((res) => { dispatch({ type: C.UPDATE_USER, payload: user }) })
      .then(() => alert("Se modifico el usuario"))
      .catch((error) => alert(error, "error"));
  }
}// S41 : Crear Ruta para editar las cantidades del carrito
export function updateOrderAmount(userId, order) {
  return function (dispatch) {
    axios.put(`${C.SERVER_ADDRESS}/users/${userId}/cart/`, order)
      .then((res) => { dispatch({ type: C.UPDATE_ORDER_AMOUNT, payload: order }) })
      .then(() => console.log("Se cambio la cantidad"))
      .catch((error) => alert(error, "error"));
  }
}//S47 : Crear Ruta para modificar una Orden
export function updateOrder(orderId, state) {
  return function (dispatch) {
    axios.put(`${C.SERVER_ADDRESS}/orders/${orderId}`, { state: state })
      .then((res) => { dispatch({ type: C.UPDATE_ORDER, payload: orderId }) })
      .then(() => console.log("Se modifico la orden"))
      .catch((error) => alert(error, "error"));
  }
}//S67 : Crear ruta /promote
// POST /auth/promote/:id
// Promote convierte al usuario con ID: id a Admin.
export function promoteUser(id) {
  return function (dispatch) {
    axios.put(`${C.SERVER_ADDRESS}/auth/promote/${id}`, id)
      .then(res => { dispatch({ type: C.PROMOTE_USER, payload: id }) })
      .catch((error) => alert(error))
  }
}//SXX : Crear Ruta para Cerrar un Carrito
export function closeCart(cartId) {
  return function (dispatch) {
    axios.patch(`${C.SERVER_ADDRESS}/orders/${cartId}`)
      .then((res) => { dispatch({ type: C.CLOSE_CART, payload: cartId }) })
      .then(() => alert("Se cerro el carrito"))
      .catch((error) => alert(error, "error"));
  }
}// S55 : Crear ruta para Modificar Review
export function updateReview(productId, reviewId) {
  return function (dispatch) {
    axios.put(`${C.SERVER_ADDRESS}/product/${productId}/review/${reviewId}`)
      .then((res) => { dispatch({ type: C.UPDATE_REVIEW, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}// S70 : Crear Ruta para password reset
export function updatePassword(userId) {
  return function (dispatch) {
    axios.put(`${C.SERVER_ADDRESS}/users/${userId}/passwordReset`)
      .then((res) => { dispatch({ type: C.UPDATE_PASSWORD, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}// S27 eliminar un producto DELETE /products/:id
export function removeProduct(productId) {
  return function (dispatch) {
    axios.delete(`${C.SERVER_ADDRESS}/products/${productId}`)
      .then((res) => { dispatch({ type: C.REMOVE_PRODUCT, payload: productId }) })
      .then(() => alert("Se elimino el producto"))
      .catch((error) => alert(error, "error"));
  }
}//S19 : Crear Ruta para eliminar Categoria
export function removeCategory(categoryId) {
  return function (dispatch) {
    axios.delete(`${C.SERVER_ADDRESS}/products/category/${categoryId}`)
      .then((res) => { dispatch({ type: C.REMOVE_CATEGORY, payload: categoryId }) })
      .then(() => console.log("Se elimino la categoria"))
      .catch((error) => alert(error, "error"));
  }
}// S17 : Crear ruta para sacar categorias de un producto.
export function removeProductCategory(productId, categoryId) {
  return function (dispatch) {
    axios.delete(`${C.SERVER_ADDRESS}/products/${productId}/category/${categoryId}`)
      .then((res) => { dispatch({ type: C.REMOVE_PRODUCT_CATEGORY, payload: res.data }) })
      .then(() => console.log("Se le elimino la categoria al producto"))
      .catch((error) => alert(error));
  }
}// S40 : Crear Ruta para vaciar el carrito
export function removeCart(userId) {
  return function (dispatch) {
    axios.delete(`${C.SERVER_ADDRESS}/users/${userId}/cart`)
      .then((res) => { dispatch({ type: C.REMOVE_CART, payload: res.data }) })
      .catch((error) => alert(error, "error"));
  }
}// S37 : Crear Ruta para eliminar Usuario DELETE /users/:id
export function removeUser(userId) {
  return function (dispatch) {
    axios.delete(`${C.SERVER_ADDRESS}/users/${userId}`)
      .then((res) => { dispatch({ type: C.REMOVE_USER, payload: userId }) })
      .then(() => console.log("Se elimino el usuario"))
      .catch((error) => alert(error, "error"));
  }
}// Eliminar una orden del carrito
export function removeOrder(orderId) {
  return function (dispatch) {
    axios.delete(`${C.SERVER_ADDRESS}/orders/${orderId}`)
      .then((res) => { dispatch({ type: C.REMOVE_ORDER, payload: orderId }) })
      .then(() => console.log("Se elimino la orden del carrito satisfactoriamente"))
      .catch((error) => alert(error, "error"));
  }
}// Eliminar una review
export function removeReview(IdProduct, idReview) {
  return function (dispatch) {
    axios.delete(`${C.SERVER_ADDRESS}/products/${IdProduct}/review/${idReview}`)
      .then((res) => { dispatch({ type: C.REMOVE_ORDER, payload: idReview }) })
      .catch((error) => alert(error));
  }
}

// ------------------------------------------------------------------------------------
// --------------------------- GOOGLE VALIDATION --------------------------------------
// ------------------------------------------------------------------------------------

export const gmailValidation = (value) => {
  return function (dispatch) {
    axios.post("auth/login/google", value)
      .then((res) => { dispatch({ type: C.GMAIL_VALIDATION, payload: res.data }) })
      .catch((error) => alert(error));
  }
}
