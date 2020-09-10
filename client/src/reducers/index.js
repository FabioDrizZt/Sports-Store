import {
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_CATEGORIES,
    GET_CATEGORY_PRODUCTS,
    GET_ORDER,
    SEARCH_PRODUCTS,
    GET_CARTUSER,
    GET_USER,
    CREATE_PRODUCT,
    CREATE_USER,
    CREATE_CATEGORY,
    CREATE_PRODUCT_CATEGORY,
    UPDATE_PRODUCT,
    UPDATE_CATEGORY,
    REMOVE_PRODUCT,
    REMOVE_CATEGORY,
    REMOVE_PRODUCT_CATEGORY,
    UPDATE_ORDER_AMOUNT,
    ADD_TO_CART,
} from '../actions';

const initialState = {
    products: [],
    categories: [],
    order:[],
    productCategories: [],
    product: [],
    cart: [],
    users: [],
    user:[]
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
            return {...state, order: action.payload}
        } case SEARCH_PRODUCTS: {
            return { ...state, products: action.payload }
        } case GET_CARTUSER: {
            return { ...state, cart: action.payload }
        } case GET_USER: {
            return { ...state, cart: action.payload }
        } case CREATE_PRODUCT: {        
            return { ...state, products: state.products.concat(action.payload) }
        } case CREATE_USER: {
            return { ...state, users: state.users.concat(action.payload) }
        } case CREATE_CATEGORY: {
            return { ...state, categories: state.categories.concat(action.payload) }
        } case CREATE_PRODUCT_CATEGORY: {
            return { ...state, productCategories: state.productCategories.concat(action.payload) }
        } case UPDATE_PRODUCT: {
            return { ...state, products: state.products.filter(product => product.name !== action.payload.named) }
        } case UPDATE_CATEGORY: {
            let categories = [...state.categories.filter(x => x.id !== action.payload.id)]
            return { ...state, categories: categories.concat(action.payload) }
        } case REMOVE_PRODUCT: {
            return { ...state, products: state.products.filter(product => product.name !== action.payload.name) }
        } case REMOVE_CATEGORY: {
            return { ...state, categories: state.categories.filter(category => category.id !== action.payload) }
        } case REMOVE_PRODUCT_CATEGORY: {
            return { ...state, productCategories: state.productCategories.filter(productCategory => productCategory.name !== action.payload.name) }
        } case UPDATE_ORDER_AMOUNT: {
            let amount = [...state.amount.filter(x => x.amount !== action.payload.amount)]
            return { ...state, amount: amount.concat(action.payload) }
        } case ADD_TO_CART: {
            return { ...state, cart: state.cart.concat(action.payload) }
        }
        default:
            return state;
    }
}

export default rootReducer;
