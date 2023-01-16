import { createSlice } from '@reduxjs/toolkit';
import { get_products_by_sold } from '../services/products/products.service';

const initialState = {
  products_sold: null,
  status: 'idle',
  error: null
};

export const soldSlice = createSlice({
  name: 'arrival',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(get_products_by_sold.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(get_products_by_sold.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.products_sold = action.payload.products;
      }
    })
    .addCase(get_products_by_sold.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.error = action.error.message
      }
    })
  }
})

const { reducer } = soldSlice;
export default reducer;
