import { createSlice } from '@reduxjs/toolkit';
import { get_wishlist_items,
  add_wishlist_item,
  get_wishlist_item_total,
  remove_wishlist_item } from '../services/wishlist/wishlist.service';

const initialState = {
  items: null,
  total_items: 0,
  status: 'idle',
  error: null
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clear_wishlist: (state) => {
      state.items = [];
      state.total_items = 0;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(get_wishlist_items.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(get_wishlist_items.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.wishlist;
    })
    .addCase(get_wishlist_items.rejected, (state, action) => {
        state.status = 'idle';
        // state.error = action.error.message
    })
    .addCase(add_wishlist_item.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(add_wishlist_item.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.wishlist;
    })
    .addCase(add_wishlist_item.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message;
    })
    .addCase(get_wishlist_item_total.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(get_wishlist_item_total.fulfilled, (state, action) => {
      state.status = 'idle';
      state.total_items = action.payload.total_items;
    })
    .addCase(get_wishlist_item_total.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message
    })
    .addCase(remove_wishlist_item.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(remove_wishlist_item.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items = action.payload.wishlist;
    })
    .addCase(remove_wishlist_item.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message
    })
  }
})

export const { clear_wishlist } = wishlistSlice.actions;
const { reducer } = wishlistSlice;
export default reducer;
