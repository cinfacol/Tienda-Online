import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../auth/authApi';

export const check_coupon = createAsyncThunk(
  'coupons/check_coupon',
  async(coupon_name, thunkAPI) => {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    try {
      const res = await authApi.get(`/api/coupons/check-coupon?coupon_name=${coupon_name}`, config);

      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.dispatch(Error);
      }
    } catch (error) {
      if (error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
)
