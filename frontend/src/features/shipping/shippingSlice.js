import { createSlice } from '@reduxjs/toolkit';
import { get_shipping_options } from '../services/shipping/shipping.service';

const initialState = {
  shipping: null,
};

export const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(get_shipping_options.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(get_shipping_options.fulfilled, (state, action) => {
        state.status = 'idle';
        state.shipping = action.payload.shipping_options;
    })
    .addCase(get_shipping_options.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
    })
  }
})

const { reducer } = shippingSlice;
export default reducer;
