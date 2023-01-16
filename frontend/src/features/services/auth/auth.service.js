import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from './authApi';

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ username, first_name, last_name, email, password, re_password }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await authApi.post(`/auth/users/`, {username, first_name, last_name, email, password, re_password}, config);

      if (response.status === 201) {
        return response.data;
      } else {
        return thunkAPI.dispatch(Error);
      }
    } catch (error) {
      if (error.response.data.email) {
        // console.log('catch_error_email', error.response.data.email[0]);
        return thunkAPI.rejectWithValue(error.response.data.email[0]);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const activate = createAsyncThunk(
  'auth/activate',
  async ({ uid, token }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await authApi.post(`/auth/users/activation/`, { uid, token }, config);

      if (response.status === 204) {
        // thunkAPI.getState();
        return response.data;
      }
    } catch (error) {
      // console.log('error_response_data_detail', error.response.data.detail);
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await authApi.post(`/auth/jwt/create/`, { email, password }, config);

      if (response.status === 200) {
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);

        return response.data;
      }
    } catch (error) {
      if (error.response) {
        // console.log('catch_error_response_data_detail', error.response.data.detail);
        return thunkAPI.rejectWithValue(error.response.data.detail);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/load_user',
  async (arg, thunkAPI ) => {

    if (localStorage.getItem('access')) {

      const config = {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
        }
      };
      try {
        const response = await authApi.get(`/auth/users/me/`, config);
        if (response.status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data));
          return response.data; // action.payload
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          return thunkAPI.rejectWithValue(error.response.data.message)
        } else {
          return thunkAPI.rejectWithValue(error.message)
        }
      }
    }
  }
)

export const refresh = createAsyncThunk(
  'auth/refresh',
  async (arg, thunkAPI) => {

    if (localStorage.getItem('refresh')) {

      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify({
        refresh: localStorage.getItem('refresh')
      });

      try {
        const response = await authApi.post(`/auth/jwt/refresh/`, body, config);

        if (response.status === 200) {
          return response.data
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          return thunkAPI.rejectWithValue(error.response.data.message)
        } else {
          return thunkAPI.rejectWithValue(error.message)
        }
      }
    }
  }
)

export const reset_password = createAsyncThunk(
  'auth/reset_password',
  async ({ email, }, thunkAPI) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await authApi.post(`/auth/users/reset_password/`, { email, }, config);

      if (response.status === 204) {
          return response.data
        }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message)
      } else {
        return thunkAPI.rejectWithValue(error.message)
      }
    }
  }
)
export const reset_password_confirm = createAsyncThunk(
  'auth/reset_password_confirm',
  async ({ uid, token, new_password, re_new_password, }, thunkAPI) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await authApi.post(`/auth/users/reset_password_confirm/`, { uid, token, new_password, re_new_password, }, config);
      if (response.status === 204) {
          return response.data
        }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message)
      } else {
        return thunkAPI.rejectWithValue(error.message)
      }
    }
  }
)
