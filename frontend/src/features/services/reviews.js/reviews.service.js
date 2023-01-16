import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../auth/authApi';

export const get_reviews = createAsyncThunk(
  'reviews/get_reviews',
  async (productId, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Accept': 'application/json'
        }
      };
      try {
        const res = await authApi.get(`/api/reviews/get-reviews/${productId}`, config);
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

export const create_review = createAsyncThunk(
  'reviews/create_review',
  async ({productId, rating, comment}, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      const body = JSON.stringify({
        rating,
        comment
      });
      try {
        const res = await authApi.post(`/api/reviews/create-review/${productId}`, body, config);
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

export const get_review = createAsyncThunk(
  'reviews/get_review',
  async (productId, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
        }
      };
      try {
        const res = await authApi.get(`/api/reviews/get-review/${productId}`, config);
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

export const update_review = createAsyncThunk(
  'reviews/update_review',
  async ({productId, rating, comment}, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      const body = JSON.stringify({
        rating,
        comment
      });
      try {
        const res = await authApi.put(`/api/reviews/update-review/${productId}`, body, config);
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

export const delete_review = createAsyncThunk(
  'reviews/delete_review',
  async (productId, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
        },
        data: {}
      };

      try {
        const res = await authApi.delete(`/api/reviews/delete-review/${productId}`, config);
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

export const filter_reviews = createAsyncThunk(
  'reviews/filter_reviews',
  async ({productId, rating}, thunkAPI) => {
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    };

    let myRating;

    if (rating === 0.5)
      myRating = '0.5';
    else if (rating === 1 || rating === 1.0)
      myRating = '1.0';
    else if (rating === 1.5)
      myRating = '1.5';
    else if (rating === 2 || rating === 2.0)
      myRating = '2.0';
    else if (rating === 2.5)
      myRating = '2.5';
    else if (rating === 3 || rating === 3.0)
      myRating = '3.0';
    else if (rating === 3.5)
      myRating = '3.5';
    else if (rating === 4 || rating === 4.0)
      myRating = '4.0';
    else if (rating === 4.5)
      myRating = '4.5';
    else
      myRating = '5.0';

    try {
      const res = await authApi.get(`/api/reviews/filter-reviews/${productId}?rating=${myRating}`, config);
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
)
