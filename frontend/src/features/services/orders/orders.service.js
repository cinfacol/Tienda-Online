import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../auth/authApi';

export const list_orders = createAsyncThunk(
  'orders/list_orders',
  async (thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };
      try {
        const res = await authApi.get(`/api/orders/get-orders`, config);
        if (res.status === 200) {
          return res.data;
        } else {
          thunkAPI.dispatch(Error);
        }
      } catch (error) {
        if (error.response.data) {
          return thunkAPI.rejectWithValue(error.response.data);
        } else {
          return thunkAPI.rejectWithValue(error.message);
        }
      }
    } else {
      let cart = []
      cart = JSON.parse(localStorage.getItem('cart'));

      return cart
    }
  }
);

export const get_order_detail = createAsyncThunk(
  'orders/get_order_detail',
  async (transactionId, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };
      try {
        const res = await authApi.get(`/api/orders/get-order/${transactionId}`, config);
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
  }
);
