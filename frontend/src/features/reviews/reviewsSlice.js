import { createSlice } from '@reduxjs/toolkit';
import { get_reviews, get_review, create_review, update_review, delete_review, filter_reviews } from '../services/reviews.js/reviews.service';

const initialState = {
  review: null,
  reviews: null,
  status: 'idle',
  error: null
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clear_reviews: (state) => {
      state.review = null;
      state.reviews = [];
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(get_reviews.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(get_reviews.fulfilled, (state, action) => {
        state.status = 'idle';
        state.reviews = action.payload.reviews;
    })
    .addCase(get_reviews.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message
    })
    .addCase(get_review.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(get_review.fulfilled, (state, action) => {
        state.status = 'idle';
        state.review = action.payload.review;
    })
    .addCase(get_review.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message;
    })
    .addCase(create_review.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(create_review.fulfilled, (state, action) => {
      state.status = 'idle';
      state.reviews = action.payload.review;
    })
    .addCase(create_review.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message
    })
    .addCase(update_review.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(update_review.fulfilled, (state, action) => {
      state.status = 'idle';
      state.reviews = action.payload.reviews;
    })
    .addCase(update_review.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message
    })
    .addCase(delete_review.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(delete_review.fulfilled, (state, action) => {
      state.status = 'idle';
      state.reviews = action.payload.reviews;
    })
    .addCase(delete_review.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message
    })
    .addCase(filter_reviews.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(filter_reviews.fulfilled, (state, action) => {
      state.status = 'idle';
      state.reviews = action.payload.reviews;
    })
    .addCase(filter_reviews.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message
    })
  }
})

export const { clear_reviews } = reviewsSlice.actions;
const { reducer } = reviewsSlice;
export default reducer;
