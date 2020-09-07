import {
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_CATEGORIES,
    GET_CATEGORY_PRODUCTS,
    SEARCH_PRODUCTS,
    CREATE_PRODUCT,
    CREATE_CATEGORY,
    CREATE_PRODUCT_CATEGORY,
    UPDATE_PRODUCT,
    UPDATE_CATEGORY,
    REMOVE_PRODUCT,
    REMOVE_CATEGORY,
    REMOVE_PRODUCT_CATEGORY
} from '../actions';

const initialState = {
    products: [],
    categories: [],
    productCategories: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT: {
            return { ...state, products: action.payload }
        } case GET_PRODUCTS: {
            return { ...state, products: action.payload }
        } case GET_CATEGORIES: {
            return { ...state, categories: action.payload }
        } case GET_CATEGORY_PRODUCTS: {
            return { ...state, products: action.payload }
        } case SEARCH_PRODUCTS: {
            return { ...state, products: action.payload }
        } case CREATE_PRODUCT: {           
            return { ...state, products: state.products.concat(action.payload) }
        } case CREATE_CATEGORY: {
            return { ...state, categories: state.categories.concat(action.payload) }
        } case CREATE_PRODUCT_CATEGORY: {
            return { ...state, productCategories: state.productCategories.concat(action.payload) }
        } case UPDATE_PRODUCT: {           
            return { ...state, products: state.products.filter(product => product.name !== action.payload.named) }
        } case UPDATE_CATEGORY: {
            return { ...state, categories: state.categories.filter(category => category.name !== action.payload.name) }
        } case REMOVE_PRODUCT: {
            return { ...state, products: state.products.filter(product => product.name !== action.payload.name) }
        } case REMOVE_CATEGORY: {
            return { ...state, categories: state.categories.filter(category => category.name !== action.payload.name) }
        } case REMOVE_PRODUCT_CATEGORY: {
            return { ...state, productCategories: state.productCategories.filter(productCategory => productCategory.name !== action.payload.name) }
        }
        default:
            return state;
    }
}

export default rootReducer;