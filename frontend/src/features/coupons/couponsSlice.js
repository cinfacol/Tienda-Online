import { createSlice } from '@reduxjs/toolkit';
import { check_coupon } from '../services/coupons/coupons.service';

const initialState = {
  coupon: null
};

export const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(check_coupon.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(check_coupon.fulfilled, (state, action) => {
        state.status = 'idle';
        state.coupon = action.payload.coupon;
    })
    .addCase(check_coupon.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.error;
    })
  }
})

const { reducer } = couponsSlice;
export default reducer;
