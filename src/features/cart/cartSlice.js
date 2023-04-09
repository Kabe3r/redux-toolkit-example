import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiSlice } from '../api-slice/ApiSlice';

const url = 'https://course-api.com/react-useReducer-cart-project';


const initialState = {
      cartItems: [],
      amount: 0,
      total: 0,
      isLoading: false,
}

console.log(apiSlice.endpoints.getData)
export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
      try {
            const resp = await axios(url);
            console.log(resp)
            return resp.data;
      } catch (err) {
            return console.log(err);
      }
})
// console.log(getCartItems)
// eslint-disable-next-line react-hooks/rules-of-hooks

const cartSlice = createSlice({
      name: 'cart',
      initialState,
      reducers: {
            clearCart: (state) => {
                  state.cartItems = [];
                  // return { ...store, cartItems: [] };
            },

            removeItem: (state, action) => {
                  const itemId = action.payload;
                  state.cartItems = state.cartItems.filter(item => item.id !== itemId);
            },
            increase: (state, { payload }) => {
                  const cartItem = state.cartItems.find((item) => item.id === payload);
                  cartItem.amount = cartItem.amount + 1;
            },
            decrease: (state, { payload }) => {
                  const cartItem = state.cartItems.find((item) => item.id === payload);
                  cartItem.amount = cartItem.amount - 1;
            },
            calculateTotals: (state) => {
                  let amount = 0;
                  let total = 0;
                  state.cartItems.forEach((item) => {
                        amount += item.amount;
                        total += item.amount * item.price;
                  });
                  state.amount = amount;
                  state.total = total;
            },
      },
      extraReducers: (builder) => {
            //       // console.log(builder)
                  // builder
                  // .addMatcher(apiSlice.endpoints.getData.matchPending, (state) => {
                  //       console.log(state, 'dkhjdskjd')
                  //       state.isLoading = true;
                  // })
                  // .addMatcher(apiSlice.endpoints.getData.matchFulfilled, (state, {payload}) => {
                  //       console.log(state);
                  //       state.isLoading = false;
                  //       state.cartItems = payload;
                  // })
                  // .addMatcher(apiSlice.endpoints.getData.matchRejected, (state, action) => {
                  //       console.log(action);
                  //       state.isLoading = false;
                  // })
                  builder
                  .addCase(getCartItems.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(getCartItems.fulfilled, (state, action) => {
                    // console.log(action);
                    state.isLoading = false;
                    state.cartItems = action.payload;
                  })
                  .addCase(getCartItems.rejected, (state, action) => {
                    console.log(action);
                    state.isLoading = false;
                  });
      },
     
});

// console.log(cartSlice.caseReducers.extraReducers());
export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;