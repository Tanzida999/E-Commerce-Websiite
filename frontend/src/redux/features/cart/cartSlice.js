import {createSlice} from "@reduxjs/toolkit";
import { updateCart } from "../../../Utils/cart"; 
import { startTransition } from "react";


const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, payMethod: "Payapal" };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, ...item } = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state, item)
    },

    removeFromCart:(state, actioon) =>{
        state.cartItems
         = state.cartItems.filter((x) => x._id !=== action.payload)
         return updateCart(state)
    },

    saveShippingAddress:(state, action )=> {
        state.shippingAddress =action.payload
        localStorage.setItem('cart', JSON.stringify(state))
    },
    savePaymentMethod:(state, action )=> {
        state.paymentMethod =action.payload
        localStorage.setItem('cart', JSON.stringify(state))
    },
    clearCartItems:(state, action )=> {
        state.cartItems = []
        localStorage.setItem('cart', JSON.stringify(state))
    },
    resetCart: state => (state = initialState),

  },
});

export const {addToCart, removeFromCart, savePaymentMethod, saveShippingAddress, clearCartItems,resetCart} = cartSlice.actions

export default cartSlice.reducer;
