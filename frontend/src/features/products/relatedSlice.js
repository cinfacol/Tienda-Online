import { createSlice } from '@reduxjs/toolkit';
import { get_related_products } from '../services/products/products.service';

const initialState = {
  related_products: null,
  status: 'idle',
  error: null
};

export const relatedSlice = createSlice({
  name: 'related',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(get_related_products.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(get_related_products.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.related_products = action.payload.related_products;
      }
    })
    .addCase(get_related_products.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.error = action.error.message
      }
    })
  }
})

const { reducer } = relatedSlice;
export default reducer;
