import { createSlice } from '@reduxjs/toolkit';
import {
  list_orders,
  get_order_detail
} from '../services/orders/orders.service';

const initialState = {
  orders: null,
  order: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(list_orders.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(list_orders.fulfilled, (state, action) => {
      state.status = 'idle';
      state.orders = action.payload.orders;
    })
    .addCase(list_orders.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message;
    })
    .addCase(get_order_detail.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(get_order_detail.fulfilled, (state, action) => {
      state.status = 'idle';
      state.order = action.payload.order;
    })
    .addCase(get_order_detail.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message;
    })
  }
})

const { reducer } = ordersSlice;
export default reducer;
