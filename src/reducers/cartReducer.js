export const cartReducer=(state={cartItems : [], loading: false, error: null },action)=>{

    switch (action.type)
     {
        case 'ADD_TO_CART':
        
        const alreadyExists = state.cartItems.find(item=>item.ITMREF_0===action.payload.ITMREF_0)
        if(alreadyExists){
                    return {
                        ...state,
                        cartItems:state.cartItems.map(item=>item.ITMREF_0===action.payload.ITMREF_0?action.payload:item)
                    }
        }else{
             return{
            ...state, 
            cartItems : [...state.cartItems,action.payload]
        }
       
        }
         case 'DELETE_FROM_CART':return{
                                ...state,
                                cartItems:state.cartItems.filter(item=>item.ITMREF_0!==action.payload.ITMREF_0)
        }
       
        default : return state


}
}
  