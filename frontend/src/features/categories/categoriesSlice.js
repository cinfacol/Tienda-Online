import { createSlice } from '@reduxjs/toolkit';
import { get_categories } from '../services/categories/categories.service';

const initialState = {
  categories: null,
  status: 'idle',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(get_categories.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(get_categories.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.categories = action.payload.categories;
      }
    })
    .addCase(get_categories.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.error = action.error.message
      }
    })
  }
})

const { reducer } = categoriesSlice;
export default reducer;
