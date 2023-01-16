import { createSlice } from '@reduxjs/toolkit';
import { get_payment_total, get_client_token, process_payment } from '../services/payment/payment.service';

const initialState = {
  clientToken: null,
  made_payment: false,
  original_price: 0.0,
  total_after_coupon: 0.0,
  total_amount: 0.0,
  total_compare_amount: 0.0,
  estimated_tax: 0.0,
  shipping_cost: 0.0,
  status: 'idle',
  error: null
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    reset: (state) => {
      state.clientToken = null;
      state.made_payment = false;
      state.original_price = 0.0;
      state.total_after_coupon = 0.0;
      state.total_amount = 0.0;
      state.total_compare_amount = 0.0;
      state.estimated_tax = 0.0;
      state.shipping_cost = 0.0;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(get_payment_total.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(get_payment_total.fulfilled, (state, action) => {
        state.status = 'idle';
        state.original_price = action.payload.original_price;
        state.total_after_coupon = action.payload.total_after_coupon;
        state.total_amount = action.payload.total_amount;
        state.total_compare_amount = action.payload.total_compare_amount;
        state.estimated_tax = action.payload.estimated_tax;
        state.shipping_cost = action.payload.shipping_cost;
    })
    .addCase(get_payment_total.rejected, (state, action) => {
        state.status = 'idle';
        state.original_price = 0.00;
        state.total_after_coupon = 0.00;
        state.total_amount = 0.00;
        state.total_compare_amount = 0.00;
        state.estimated_tax = 0.00;
        state.shipping_cost = 0.00;
        state.error = action.payload;
    })

    .addCase(get_client_token.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(get_client_token.fulfilled, (state, action) => {
        state.status = 'idle';
        state.clientToken = action.payload.braintree_token;
    })
    .addCase(get_client_token.rejected, (state, action) => {
        state.status = 'idle';
        state.clientToken = null;
        state.error = action.payload;
    })

    .addCase(process_payment.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(process_payment.fulfilled, (state, action) => {
        state.status = 'idle';
        state.process_payment = action.payload
        state.made_payment = true;
    })
    .addCase(process_payment.rejected, (state, action) => {
        state.status = 'idle';
        state.made_payment = false;
        state.error = action.payload;
    })
  }
})

export const { reset } = paymentSlice.actions;
const { reducer } = paymentSlice;
export default reducer;
