import axios from 'axios';
/*
export const registerUser=(user) =>async dispatch=>{

    dispatch({type:'USER_REGISTER_REQUEST'})
try{
    const response = await axios.post('/api/users/register',user)
    console.log(response);
    dispatch({type:'USER_REGISTER_SUCCESS'})

}catch(error){
    dispatch({type:'USER_REGISTER_FAILED',payload:error})

}
}*/

export const loginUser = (user) => async  (dispatch) => {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    try {
        const response = await axios.post('http://localhost:5000/api/users/login', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Login response:', response);

        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data });
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        window.location.href = '/homescreen';
    } catch (error) {
        console.error('Login failed:', error.response || error.message);
        dispatch({ type: 'USER_LOGIN_FAILED', payload: error.response ? error.response.data : error.message });
    }
};

export const logoutUser=()=>dispatch=>{
    localStorage.removeItem('currentUser')
    localStorage.removeItem('cartItems')
    window.location.href='/login'
}
