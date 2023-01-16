import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../containers/Home';
import Login from '../containers/auth/Login';
import Signup from '../containers/auth/Signup';
import Activate from '../containers/auth/Activate';
import ResetPassword from '../containers/auth/ResetPassword';
import ResetPasswordConfirm from '../containers/auth/ResetPasswordConfirm';
import Shop from '../containers/shop';
import ProductDetail from '../containers/pages/productDetail';
import Search from '../containers/pages/Search';
import Error404 from '../containers/errors/Error404';
import Cart from '../containers/pages/Cart';
import Wishlist from '../containers/pages/WishList';
import Checkout from '../containers/pages/Checkout';
import ThankYou from '../containers/pages/ThankYou';
import Dashboard from '../containers/pages/Dashboard';
import DashboardPayments from '../containers/pages/DashboardPayments';
import DashboardPaymentDetail from '../containers/pages/DashboardPaymentDetail';
import DashboardProfile from '../containers/pages/DashboardProfile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Error Display */}
        <Route path="*" element={<Error404 />} />

        <Route exact path='/' element={<Home />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/checkout' element={<Checkout />} />

        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/activate/:uid/:token' element={<Activate />} />
        <Route exact path='/reset_password' element={<ResetPassword />} />
        <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />

        <Route exact path='/shop' element={<Shop />} />
        <Route exact path='/product/:productId' element={<ProductDetail />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/thankyou' element={<ThankYou />} />

        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/dashboard/payments' element={<DashboardPayments />} />
        <Route exact path='/dashboard/payment/:transaction_id' element={<DashboardPaymentDetail />} />
        <Route exact path='/dashboard/profile' element={<DashboardProfile />} />
        <Route exact path='/wishlist' element={<Wishlist />} />
      </Routes>
    </Router>
  );
}

export default App;
