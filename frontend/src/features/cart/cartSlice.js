import { createSlice } from '@reduxjs/toolkit';
import {
  add_item,
  get_items,
  get_total,
  get_item_total,
  update_item,
  remove_item,
  empty_cart,
  synch_cart
} from '../services/cart/cart.service';

const initialState = {
  items: [],
  amount: 0.00,
  compare_amount: 0.00,
  total_items: 0,
  status: 'idle'
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(add_item.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(add_item.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.cart;
    })
    .addCase(add_item.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
    })
    .addCase(get_items.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(get_items.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload && action.payload.cart !== undefined) {
            state.items = action.payload.cart;
        } else {
            state.items = action.payload;
        }
    })
    .addCase(get_items.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
    })
    .addCase(get_total.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(get_total.fulfilled, (state, action) => {
        state.status = 'idle';
        state.amount = action.payload;
    })
    .addCase(get_total.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
    })
    .addCase(get_item_total.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(get_item_total.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload && action.payload.total_items !== undefined) {
            state.total_items = action.payload.total_items;
        } else {
            state.total_items = action.payload;
        }
    })
    .addCase(get_item_total.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
    })
    .addCase(update_item.pending, (state) => {
        if (state.status === 'idle') {
            state.status = 'pending';
        }
    })
    .addCase(update_item.fulfilled, (state, action) => {
        if (state.status === 'pending') {
            state.status = 'idle';
            state.items.count = action.payload.count;
        }
    })
    .addCase(update_item.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
    })
    .addCase(remove_item.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(remove_item.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.cart;
        if (state.total_items > 0) {
            state.total_items -= 1
        }
    })
    .addCase(remove_item.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
    })
    .addCase(empty_cart.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(empty_cart.fulfilled, (state, action) => {
        state.status = 'idle';
        state.empty_cart = action.payload;
    })
    .addCase(empty_cart.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
    })
    .addCase(synch_cart.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(synch_cart.fulfilled, (state, action) => {
        state.status = 'idle';
        state.synch_cart = action.payload;
    })
    .addCase(synch_cart.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
    })
  }
})

const { reducer } = cartSlice;
export default reducer;
