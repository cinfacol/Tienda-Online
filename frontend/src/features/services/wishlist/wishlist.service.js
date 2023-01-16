import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../auth/authApi';

export const get_wishlist_items = createAsyncThunk(
  'wishlist/get_wishlist_items',
  async (thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
        }
      };
      try {
        const res = await authApi.get(`/api/wishlist/wishlist-items`, config);
        if (res.status === 200) {
          return res.data;
        } else {
          return thunkAPI.dispatch(Error);
        }
      } catch (error) {
        if (error.res.data) {
          return thunkAPI.rejectWithValue(error.res.data);
        } else {
          return thunkAPI.rejectWithValue(error.res.message);
        }
      }
    }
  }
)

export const add_wishlist_item = createAsyncThunk(
  'wishlist/add_wishlist_item',
  async (product_id, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      const body = JSON.stringify({
        product_id
      });
      try {
        const res = await authApi.post(`/api/wishlist/add-item`, body, config);
        if (res.status === 201) {
          return res.data;
        } else {
          return thunkAPI.dispatch(Error);
        }
      } catch (error) {
        if (error.res.data) {
          return thunkAPI.rejectWithValue(error.res.data);
        } else {
          return thunkAPI.rejectWithValue(error.res.message);
        }
      }
    }
  }
)

export const get_wishlist_item_total = createAsyncThunk(
  'wishlist/get_wishlist_item_total',
  async (thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
        }
      };
      try {
        const res = await authApi.get(`/api/wishlist/get-item-total`, config);
        if (res.status === 200) {
          return res.data;
        } else {
          return thunkAPI.dispatch(Error);
        }
      } catch (error) {
        if (error.res.data) {
          return thunkAPI.rejectWithValue(error.res.data);
        } else {
          return thunkAPI.rejectWithValue(error.res.message);
        }
      }
    }
  }
)

export const remove_wishlist_item = createAsyncThunk(
  'wishlist/remove_wishlist_item',
  async (item, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const product_id = item.product.id;
      const body = JSON.stringify({
        product_id
      });
      console.log('body', body);
      const config = {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: body
      };

      try {
        const res = await authApi.delete(`/api/wishlist/remove-item`, config);
        if (res.status === 200) {
          return res.data;
        } else {
          return thunkAPI.dispatch(Error);
        }
      } catch (error) {
        if (error.res.data) {
          return thunkAPI.rejectWithValue(error.res.data);
        } else {
          return thunkAPI.rejectWithValue(error.res.message);
        }
      }
    }
  }
)
