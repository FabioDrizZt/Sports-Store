import * as C from './constants'

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
    auth: [],
    reviews: [],
    password: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case C.GET_PRODUCT: {
            return { ...state, product: action.payload }
        } case C.GET_PRODUCTS: {
            return { ...state, products: action.payload }
        } case C.GET_CATEGORIES: {
            return { ...state, categories: action.payload }
        } case C.GET_CATEGORY_PRODUCTS: {
            return { ...state, products: action.payload }
        } case C.GET_ORDER: {
            return { ...state, order: action.payload }
        } case C.GET_ORDERS: {
            return { ...state, orders: action.payload }
        } case C.SEARCH_PRODUCTS: {
            return { ...state, products: action.payload }
        } case C.GET_CARTUSER: {
            return { ...state, cart: action.payload }
        } case C.GET_USERS: {
            return { ...state, users: action.payload }
        } case C.GET_REVIEWS: {
            return { ...state, reviews: action.payload }
        } case C.USER_LOGIN: {
            return { ...state, user: action.payload }
        } case C.USER_LOGOUT: {
            return { ...state, user: [] }
        } case C.USER_SESSION: {
            return { ...state, user: action.payload }
        }
        case C.CREATE_PRODUCT: {
            return { ...state, products: state.products.concat(action.payload) }
        } case C.CREATE_USER: {
            if (action.payload.name !== "SequelizeValidationError" && action.payload.name !== "SequelizeUniqueConstraintError")
                return { ...state, users: state.users.concat(action.payload) }
            else alert("Ya Existe DNI o Email ver")
        } case C.CREATE_CATEGORY: {
            return { ...state, categories: state.categories.concat(action.payload) }
        } case C.PROMOTE_USER: {    
            let index = state.users.findIndex(x=>x.id===action.payload.id);   
            state.users[index]=action.payload;            
            return { ...state, users: [...state.users]}
        } case C.CREATE_PRODUCT_CATEGORY: {
            return { ...state, productCategories: state.productCategories.concat(action.payload) }
        } case C.CREATE_REVIEW: {
            return { ...state, reviews: [...state.reviews.filter(rev => rev.id !== action.payload)].concat(action.payload), review: action.payload }
        } case C.CREATE_LOGIN: {
            return { ...state, login: state.login.concat(action.payload) }
        } case C.GMAIL_VALIDATION: {
            return { ...state, user: action.payload, }
        } case C.UPDATE_PRODUCT: {
            return { ...state, products: state.products.filter(product => product.id !== action.payload.id) }
        } case C.UPDATE_CATEGORY: {
            return { ...state, categories: [...state.categories.filter(x => x.id !== action.payload.id)].concat(action.payload) }
        } case C.UPDATE_ORDER_AMOUNT: {
            return { ...state, cart: state.cart.map(function (x) { if (x.id === action.payload.id) return action.payload; else return x }) }
        } case C.UPDATE_USER: {
            return { ...state, users: state.users.filter(user => user.id !== action.payload.id) }
        } case C.UPDATE_ORDER: {
            return { ...state, orders: state.orders.filter(order => order.id !== action.payload.id) }
        } case C.CLOSE_CART: {
            return { ...state, carts: state.carts.map(c => { if (c.id === action.payload.id) { c.state = "closed" } }) }
        } case C.UPDATE_REVIEW: {
            return { ...state, reviews: state.reviews.filter(r => r.id !== action.payload.id) }
        } case C.UPDATE_PASSWORD: {
            return { ...state, password: state.password.filter(res => res.id !== action.payload.id) }
        } case C.ADD_TO_CART: {
            return { ...state, cart: state.cart.concat(action.payload) }
        } case C.REMOVE_PRODUCT: {
            return { ...state, products: state.products.filter(product => product.id !== action.payload) }
        } case C.REMOVE_CATEGORY: {
            return { ...state, categories: state.categories.filter(category => category.id !== action.payload) }
        } case C.REMOVE_PRODUCT_CATEGORY: {
            return { ...state, productCategories: state.productCategories.filter(productCategory => productCategory.name !== action.payload.name) }
        } case C.REMOVE_USER: {
            return { ...state, users: state.users.filter(user => user.id !== action.payload) }
        } case C.REMOVE_CART: {
            return { ...state, cart: [] }
        } case C.REMOVE_ORDER: {
            return { ...state, cart: state.cart.filter(order => order.id !== action.payload) }
        } case C.REMOVE_REVIEW: {
            return { ...state, reviews: state.reviews.filter(rev => rev.id !== action.payload) }
        } default: return state;
    }
}

export default rootReducer;
