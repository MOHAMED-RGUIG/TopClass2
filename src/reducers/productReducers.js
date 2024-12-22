export const getAllProductsReducer = (state = { products: [] , loading: false, error: null }, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_PRODUCTS_SUCCESS':
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: null
            };
        case 'GET_PRODUCTS_FAILED':
            return {
                ...state,
                loading: false,
                error: action.payload // Ensure the payload is now a serializable object
            };
        default:
            return state;
    }
};
const initialState = {
    imgProducts: [], // Make sure this matches the expected structure in your component
    loading: false,
    error: null
};

export const getAllImgProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_IMGPRODUCTS_REQUEST':
            return { ...state, loading: true };
        case 'GET_IMGPRODUCTS_SUCCESS':
            return { ...state, loading: false, imgProducts: action.payload };
        case 'GET_IMGPRODUCTS_FAILED':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};