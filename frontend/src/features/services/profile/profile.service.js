import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../auth/authApi';

export const get_user_profile = createAsyncThunk(
  'profile/get_user_profile',
  async (thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };

      try {
        const res = await authApi.get(`/api/profile/user`, config);
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

export const update_user_profile = createAsyncThunk(
  'profile/update_user_profile',
  async ({ address_line_1, address_line_2, city, state_province_region, zipcode, phone, country_region }, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`
        }
      };

      const body = JSON.stringify({
        address_line_1,
        address_line_2,
        city,
        state_province_region,
        zipcode,
        phone,
        country_region
      });

      try {
        const res = await authApi.put(`/api/profile/update`, body, config);
        if (res.status === 200 && !res.data.error) {
          return res.data;
        } else {
          return thunkAPI.dispatch(Error);
        }
      } catch (error) {
        if (error.response.data) {
          console.log('catch error', error.response.data);
          return thunkAPI.rejectWithValue(error.response.data);
        } else {
          return thunkAPI.rejectWithValue(error.message);
        }
      }
    }
  }
);
