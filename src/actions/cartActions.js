export const addToCart = (product, quantity, isChecked) => (dispatch ,getState)=>{

    var cartItem = {
        ITMREF_0 : product.ITMREF_0,
        ITMDES1_0 : product.ITMDES1_0,
    Image : product.Image,

    quantity : Number(quantity),
    PRI_0: product.PRI_0,
    price: isChecked ? 0 : product.PRI_0 * quantity,
    isChecked: isChecked}
  
  
      if(cartItem.quantity<1){
          alert("You cannot choose less than 1 quantity ")
      }else{
          dispatch({type: 'ADD_TO_CART', payload: cartItem})
          
  
      }
  
  
  const cartItems = getState().cartReducer.cartItems
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }
  
  export const deleteFromCart=(product)=>(dispatch,getState)=>{
          dispatch({type:'DELETE_FROM_CART',payload:product})
          const cartItems = getState().cartReducer.cartItems
  
          localStorage.setItem('cartItems', JSON.stringify(cartItems))
   
  }
  