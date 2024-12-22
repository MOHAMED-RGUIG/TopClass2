import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { getAllProductsReducer,getAllImgProductsReducer } from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducer'
import { loginUserReducer, registerUserReducer } from './reducers/userReducer';
import { placeOrderReducer,getUserOrdersReducer, getAllOrdersReducer } from './reducers/orderReducer';

//import { placeCartReducer } from './reducers/cartReducer';


const middleware = [thunk];
const rootReducer = combineReducers({
  products: getAllProductsReducer, // Use meaningful key like 'allProducts'
  cartReducer: cartReducer,
  //registerUserReducer:registerUserReducer,
  loginUserReducer:loginUserReducer, 
  placeOrderReducer:placeOrderReducer,
  getUserOrdersReducer:getUserOrdersReducer,
  //getAllOrdersReducer:getAllOrdersReducer,
 

  imgProducts: getAllImgProductsReducer,
  //placeCartReducer:placeCartReducer
  // Use 
  // Use
  // other reducers...
});
const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[];
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) :null;


const initialState = {
  cartReducer : {
    cartItems: cartItems
  },
  loginUserReducer : {
    currentUser: currentUser
  }
  
}


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState
});

export default store;




