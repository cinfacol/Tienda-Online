import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../auth/authApi';

export const get_shipping_options = createAsyncThunk(
  'shipping/get_shipping_options',
  async(thunkAPI) => {
    const config = {
      headers: {
        'Accept': 'application/json',
      }
    };

    try {
      const res = await authApi.get(`/api/shipping/get-shipping-options`,config);

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
