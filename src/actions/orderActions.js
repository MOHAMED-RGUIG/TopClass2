import axios from 'axios';

export const placeOrder=(subtotal,codeClient,rS,modalitePai,dateCmd) =>async (dispatch,getState)=>{

    dispatch({type:'PLACE_ORDER_REQUEST'})
    const currentUser = getState().loginUserReducer.currentUser;
    const cartItems = getState().cartReducer.cartItems;
try{
    const response = await axios.post('https://topclassapi2b-1.onrender.com/api/orders/placeorder',{subtotal ,currentUser, cartItems,codeClient,rS,modalitePai,dateCmd})
    console.log(response);
    dispatch({type:'PLACE_ORDER_SUCCESS'})

}catch(error){
    dispatch({type:'PLACE_ORDER_FAILED',payload:error})

}
}


export const getUserOrders = () => async (dispatch, getState) => {
    const currentUser = getState().loginUserReducer.currentUser;

    dispatch({ type: 'GET_USER_ORDERS_REQUEST' });

    try {
        const response = await axios.post('https://topclassapi2b-1.onrender.com/api/orders/getuserorders', { currentUser });
        dispatch({ type: 'GET_USER_ORDERS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ 
            type: 'GET_USER_ORDERS_FAILED', 
            payload: { message: error.message, code: error.code } // Serializing error
        });
    }
};

/*export const getAllOrders = () => async dispatch => {


    dispatch({ type: 'GET_ORDERS_REQUEST' });

    try {
        const response = await axios.get('/api/orders/getallorders');
        dispatch({ type: 'GET_ORDERS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ 
            type: 'GET_ORDERS_FAILED', 
            payload: { message: error.message, code: error.code } // Serializing error
        });
    }
};*/
