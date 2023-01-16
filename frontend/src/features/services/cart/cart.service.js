import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../auth/authApi';

export const add_item = createAsyncThunk(
  'cart/add_item',
  async ({ product }, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };

      const product_id = product.id;

      const body = JSON.stringify({ product_id });
      try {
        const res = await authApi.post(`/api/cart/add-item`, body, config);
        if (res.status === 201) {
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

    } else {
      let cart = [];
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      let shouldAddItem = true;

      // eslint-disable-next-line array-callback-return
      cart.map(item => {
        if (product.id.toString() === item.product.id.toString()) {
          shouldAddItem = false;
        }
      });

      const order_item = {
        product: product,
        count: 1
      };

      if (shouldAddItem) {
        cart.push(order_item);
        localStorage.setItem('cart', JSON.stringify(cart));
      }

      return [cart];
    }
  }
);

export const get_items = createAsyncThunk(
  'cart/get_items',
  async (thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };
      try {
        const res = await authApi.get(`/api/cart/cart-items`, config);
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

export const get_total = createAsyncThunk(
  'cart/get_total',
  async (thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };
      try {
        const res = await authApi.get(`/api/cart/get-total`, config);
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
    } else {
      let total = 0.0;
      let compare_total = 0.0;
      let cart = [];

      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));

        // eslint-disable-next-line array-callback-return
        cart.map(item => {
          total += parseFloat(item.product.price) * parseFloat(item.count);
          compare_total += parseFloat(item.product.compare_price) * parseFloat(item.count);
        });
      }

      return [parseFloat(total.toFixed(2)), parseFloat(compare_total.toFixed(2))];
    }
  }
);

export const get_item_total = createAsyncThunk(
  'cart/get_item_total',
  async (thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };
      try {
        const res = await authApi.get(`/api/cart/get-item-total`, config);
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
    } else {
      let total = 0;

      if (localStorage.getItem('cart')) {
        total = JSON.parse(localStorage.getItem('cart')).length;
      }

      return total;
    }
  }
);

export const update_item = createAsyncThunk(
  'cart/update_item',
  async ({item, count}, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };

      const product_id = item.product.id;
      const body = JSON.stringify({ product_id, count });
      try {
        const res = await authApi.put(`/api/cart/update-item`, body, config);
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
    } else {
      let cart = [];

      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        // eslint-disable-next-line array-callback-return
        cart.map((cart_item, index) => {
          if (cart_item.product.id.toString() === item.product.id.toString()) {
            cart[index].count = parseInt(count);
          }
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }
  }
);

export const remove_item = createAsyncThunk(
  'cart/remove_item',
  async (item, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const product_id = item.product.id;
      const body = JSON.stringify({ product_id });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
        data: body
      };

      try {
        const res = await authApi.delete(`/api/cart/remove-item`, config);

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
    } else {
      let cart = [];
      let new_cart = [];

      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));

        // eslint-disable-next-line array-callback-return
        cart.map(cart_item => {
          if (cart_item.product.id.toString() !== item.product.id.toString()) {
            new_cart.push(cart_item);
          }
        });
        localStorage.setItem('cart', JSON.stringify(new_cart));
      }

      cart = new_cart;

      return cart;
    }
  }
);

export const empty_cart = createAsyncThunk(
  'cart/empty_cart',
  async (thunkAPI) => {
    if (localStorage.getItem('access')) {

      const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };

      try {
        const res = await authApi.delete(`/api/cart/empty-cart`, config);

        if (res.status === 200) {
          return;
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

export const synch_cart = createAsyncThunk(
  'cart/synch_cart',
  async (thunkAPI) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };
      let cart_items = [];

      if (localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'));

        // eslint-disable-next-line array-callback-return
        cart.map(cart_item => {
          const item = {};
          item.product_id = cart_item.product.id;
          item.count = cart_item.count;
          cart_items.push(item);
        });
      }

      const body = JSON.stringify({ cart_items });

      try {
        await authApi.put(`/api/cart/synch`, body, config);

      } catch (error) {
        if (error.response.data) {
          return thunkAPI.rejectWithValue(error.response.data);
        } else {
          return thunkAPI.rejectWithValue(error.message);
        }
      }
  }
);
