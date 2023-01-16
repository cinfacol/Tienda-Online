import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../auth/authApi';
import { get_item_total } from '../cart/cart.service';

export const get_payment_total = createAsyncThunk(
  'payment/payment_total',
  async({shipping_id, coupon_name,}, thunkAPI) => {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    try {
      const res = await authApi.get(`/api/payment/get-payment-total?shipping_id=${shipping_id}&coupon_name=${coupon_name}`, config);

      if (res.status === 200 && !res.data.error) {
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

export const get_client_token = createAsyncThunk(
  'payment/get_client_token',
  async(thunkAPI) => {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    try {
      const res = await authApi.get(`/api/payment/get-token`, config);

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

export const process_payment = createAsyncThunk(
  'payment/process_payment',
  async({nonce, shipping_id, coupon_name, full_name, address_line_1, address_line_2, city, state_province_region, postal_zip_code, country_region, telephone_number}, thunkAPI ) => {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    /* const body = JSON.stringify({
      nonce,
      shipping_id,
      coupon_name,
      full_name,
      address_line_1,
      address_line_2,
      city,
      state_province_region,
      postal_zip_code,
      country_region,
      telephone_number
    }); */

    try {
      const res = await authApi.post(`/api/payment/make-payment`, {nonce, shipping_id, coupon_name, full_name, address_line_1, address_line_2, city, state_province_region, postal_zip_code, country_region, telephone_number,}, config);

      if (res.status === 200 && res.data.success) {
        thunkAPI.dispatch(get_item_total());
        console.log('res', res);
        return res.data;
      } else {
        return thunkAPI.dispatch(Error);
      }
    } catch (error) {
      if (error.response.data) {
        console.log('catch_error', error);
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
)
