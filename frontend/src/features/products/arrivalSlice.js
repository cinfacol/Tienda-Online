import { createSlice } from '@reduxjs/toolkit';
import { get_products_by_arrival } from '../services/products/products.service';

const initialState = {
  products_arrival: null,
  status: 'idle',
  error: null
};

export const arrivalSlice = createSlice({
  name: 'arrival',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(get_products_by_arrival.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(get_products_by_arrival.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.products_arrival = action.payload.products;
      }
    })
    .addCase(get_products_by_arrival.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.error = action.error.message
      }
    })
  }
})

const { reducer } = arrivalSlice;
export default reducer;
