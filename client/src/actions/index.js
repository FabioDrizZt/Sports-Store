import axios from 'axios';
const SERVER_ADDRESS = 'http://localhost:3001';

export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORY_PRODUCTS = 'GET_CATEGORY_PRODUCTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const CREATE_PRODUCT_CATEGORY = 'CREATE_PRODUCT_CATEGORY';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const REMOVE_PRODUCT_CATEGORY = 'REMOVE_PRODUCT_CATEGORY';


export function getProduct(id) {
    return function (dispatch) {
        axios.get(`${SERVER_ADDRESS}/products/${id}`)
            .then(res => {
                dispatch({ type: GET_PRODUCT, payload: res.data });
            }).catch(error => alert(error, 'error'))
    }
}
export function getProducts() {
    return function (dispatch) {
        axios.get(`${SERVER_ADDRESS}/products`)
            .then(res => {
                dispatch({ type: GET_PRODUCTS, payload: res.data });
            }).catch(error => alert(error, 'error'))
    }
}
export function getCategories() {
    return function (dispatch) {
        axios.get(`${SERVER_ADDRESS}/products/categories`)
            .then(res => {
                dispatch({ type: GET_CATEGORIES, payload: res.data });
            }).catch(error => alert(error, 'error'))
    }
}
export function getCategoryProducts(nombreCat) {
    return function (dispatch) {
        axios.get(`${SERVER_ADDRESS}/products/category/${nombreCat}`)
            .then(res => {
                dispatch({ type: GET_CATEGORY_PRODUCTS, payload: res.data });
            }).catch(error => alert(error, 'error'))
    }
}
export function searchProducts(value) {
    return function (dispatch) {
        axios.get(`${SERVER_ADDRESS}/products/search/?query=${value}`)
            .then(res => {
                dispatch({ type: SEARCH_PRODUCTS, payload: res.data });
            }).catch(error => alert(error, 'error'))
    }
}
export function createProduct(input) {
    return function (dispatch) {
        axios.post(`${SERVER_ADDRESS}/products/`, input)
            .then(res => {
                dispatch({ type: CREATE_PRODUCT, payload: res.data });
            }).catch(error => alert(error, 'error'))
    }
}
export function createCategory(input) {
    console.log(input);
    return function (dispatch) {
        axios.post(`${SERVER_ADDRESS}/products/category`, input)
            .then(res => {
                dispatch({ type: CREATE_CATEGORY, payload: res.data });
            }).catch(error => alert(error, 'error'))
    }
}
export function createProductCategory(idProducto, idCategoria) {
    return function (dispatch) {
        axios.post(`${SERVER_ADDRESS}/products/${idProducto}/category/${idCategoria}`)
            .then(res => {
                dispatch({ type: CREATE_PRODUCT_CATEGORY, payload: res.data });
            }).catch(error => alert(error, 'error'))
    }
}
export function updateProduct(id,input) {
    return function (dispatch) {
        axios.put(`${SERVER_ADDRESS}/products/${id}`,input)
            .then(res => {
                dispatch({ type: UPDATE_PRODUCT, payload: res.data });
            }).then(()=> alert("Se modifico el prodcto"))
            
            .catch(error => alert(error, 'error'))
    }
}
export function updateCategory(id,input) {
    return function (dispatch) {
        axios.put(`${SERVER_ADDRESS}/products/category/${id}`,input)
            .then(res => {
                dispatch({ type: UPDATE_CATEGORY, payload: res.data });
            }).catch(error => alert(error, 'error'))
    }
}
export function removeProduct(id) {
    return function (dispatch) {
        return axios.delete(`${SERVER_ADDRESS}/products/${id}`)
            .then(res => {
                dispatch({ type: REMOVE_PRODUCT, payload: res.data });
            }).catch(error => alert(error, 'error'))
    }
}
export function removeCategory(id) {
    return function (dispatch) {
        return axios.delete(`${SERVER_ADDRESS}/products/category/${id}`)
            .then(res => {
                dispatch({ type: REMOVE_CATEGORY, payload: res.data });
            }).catch(error => alert(error, 'error'))
    }
}
export function removeProductCategory(idProducto, idCategoria) {
    return function (dispatch) {
        return axios.delete(`${SERVER_ADDRESS}/${idProducto}/categories/${idCategoria}`)
            .then(res => {
                dispatch({ type: REMOVE_PRODUCT_CATEGORY, payload: res.data });
            }).catch(error => alert(error, 'error'))
    }
}