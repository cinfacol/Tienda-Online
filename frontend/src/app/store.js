import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { NotificationReducer } from '../features/notifications/notificationSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import productsReducer from '../features/products/productsSlice';
import arrivalReducer from '../features/products/arrivalSlice';
import soldReducer from '../features/products/soldSlice';
import relatedReducer from '../features/products/relatedSlice';
import cartReducer from '../features/cart/cartSlice';
import shippingReducer from '../features/shipping/shippingSlice';
import couponsReducer from '../features/coupons/couponsSlice';
import paymentReducer from '../features/payment/paymentSlice';
import ordersReducer from '../features/orders/ordersSlice';
import profileReducer from '../features/profile/profileSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice.js';
import reviewsReducer from '../features/reviews/reviewsSlice.js';

const reducer = {
  auth: authReducer,
  notification: NotificationReducer,
  categories: categoriesReducer,
  products: productsReducer,
  arrival: arrivalReducer,
  sold: soldReducer,
  related: relatedReducer,
  cart: cartReducer,
  shipping: shippingReducer,
  coupons: couponsReducer,
  payment: paymentReducer,
  orders: ordersReducer,
  profile: profileReducer,
  wishlist: wishlistReducer,
  reviews: reviewsReducer,
}

const store = configureStore({
  reducer,
  devTools: true,
})

export default store;
