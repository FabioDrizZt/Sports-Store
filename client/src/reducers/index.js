import {
    // aca van los actions del GET
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_CATEGORIES,
    GET_CATEGORY_PRODUCTS,
    GET_ORDER,
    GET_ORDERS,
    GET_CARTUSER,
    GET_USER,
    SEARCH_PRODUCTS,
    GET_USERS,
    GET_REVIEWS,
    GET_LOGGED_USER,
    // aca van los actions del POST/CREATE
    CREATE_PRODUCT,
    CREATE_USER,
    CREATE_CATEGORY,
    CREATE_PRODUCT_CATEGORY,
    ADD_TO_CART,
    CREATE_REVIEW,
    // aca van los actions del UPDATE/MODIFICAR
    UPDATE_PRODUCT,
    UPDATE_CATEGORY,
    UPDATE_USER,
    UPDATE_ORDER_AMOUNT,
    UPDATE_ORDER,
    PROMOTE_USER,
    CLOSE_CART,
    UPDATE_REVIEW,
    // aca van los actions del DELETE/REMOVE
    REMOVE_PRODUCT,
    REMOVE_CATEGORY,
    REMOVE_PRODUCT_CATEGORY,
    REMOVE_CART,
    REMOVE_USER,
    REMOVE_ORDER,
    REMOVE_REVIEW
} from '../actions';

const initialState = {
    products: [],
    categories: [],
    order: [],
    orders: [],
    productCategories: [],
    product: [],
    cart: [],
    users: [], // lista de usuarios para q vea el admin
    user: [], // deberia guardar el usuario logueado
    auth:[],
    reviews: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT: {
            return { ...state, product: action.payload }
        } case GET_PRODUCTS: {
            return { ...state, products: action.payload }
        } case GET_CATEGORIES: {
            return { ...state, categories: action.payload }
        } case GET_CATEGORY_PRODUCTS: {
            return { ...state, products: action.payload }
        } case GET_ORDER: {
            return { ...state, order: action.payload }
        } case GET_ORDERS: {
            return { ...state, orders: action.payload }
        }case SEARCH_PRODUCTS: {
            return { ...state, products: action.payload }
        } case GET_CARTUSER: {
            return { ...state, cart: action.payload }
        } case GET_USER: {
            return {
                ...state, user: { // provisorio hasta q se cree el action con el payload
                    id: 1,
                    name: "Joaquin",
                    lastName: "Musculoso",
                    DNI: "27432915",
                    email: "chao@ejemplo.com",
                    password: "blablabla",
                    role: "user"
                }
            }
        } case GET_USERS: {
            return { ...state, cart: action.payload }
        } case GET_REVIEWS:{
            return {...state, reviews:action.payload}
        }case GET_LOGGED_USER:{
            return {...state, user:action.payload}
        } case CREATE_PRODUCT: {
            return { ...state, products: state.products.concat(action.payload) }
        } case CREATE_USER: {
            if (action.payload.name !== "SequelizeValidationError" && action.payload.name !== "SequelizeUniqueConstraintError")
                return { ...state, users: state.users.concat(action.payload) }
            else alert("Ya Existe DNI o Email ver")
        } case CREATE_CATEGORY: {
            return { ...state, categories: state.categories.concat(action.payload) }
        }case PROMOTE_USER:{
            return { ...state, user: [...state.user.filter(x => x.id !== action.payload.id)].concat(action.payload)}
        }case CREATE_PRODUCT_CATEGORY: {
            return { ...state, productCategories: state.productCategories.concat(action.payload) }
        } case CREATE_REVIEW: {
            return { ...state, reviews: state.reviews.concat(action.payload) }
        } case UPDATE_PRODUCT: {
            return { ...state, products: state.products.filter(product => product.id !== action.payload.id) }
        } case UPDATE_CATEGORY: {
            return { ...state, categories: [...state.categories.filter(x => x.id !== action.payload.id)].concat(action.payload) }
        } case UPDATE_ORDER_AMOUNT: {
            return { ...state, cart: [...state.cart.filter(x => x.id !== action.payload.id)].concat(action.payload) }
        } case UPDATE_USER: {
            return { ...state, users: state.users.filter(user => user.id !== action.payload.id) }
        } case UPDATE_ORDER: {
            return { ...state, orders: state.orders.filter(order => order.id !== action.payload.id) }
        } case CLOSE_CART: {
            return { ...state, carts: state.carts.map(c => { if (c.id === action.payload.id) { c.state = "closed" } }) }
        } case UPDATE_REVIEW: {
            return { ...state, reviews: state.reviews.filter(r => r.id !== action.payload.id) }
        } case REMOVE_PRODUCT: {
            return { ...state, products: state.products.filter(product => product.id !== action.payload) }
        } case REMOVE_CATEGORY: {
            return { ...state, categories: state.categories.filter(category => category.id !== action.payload) }
        } case REMOVE_PRODUCT_CATEGORY: {
            return { ...state, productCategories: state.productCategories.filter(productCategory => productCategory.name !== action.payload.name) }
        } case REMOVE_USER: {
            return { ...state, users: state.user.filter(user => user.name !== action.payload.name) }
        } case ADD_TO_CART: {
            return { ...state, cart: state.cart.concat(action.payload) }
        } case REMOVE_CART: {
            return { ...state, cart: [] }
        } case REMOVE_ORDER: {
            return { ...state, cart: state.cart.filter(order => order.id !== action.payload) }   
        } case REMOVE_REVIEW: {
            return { ...state, reviews: state.reviews.filter(rev => rev.id !== action.payload) }
        }
        default:
            return state;
    }
}

export default rootReducer;
