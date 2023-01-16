// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/navigations/Navbar';
import Footer from '../components/navigations/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get_items, get_total, get_item_total } from '../features/services/cart/cart.service';
import { refresh, loadUser } from '../features/services/auth/auth.service';
import { get_user_profile } from '../features/services/profile/profile.service';

const Layout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(get_user_profile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(get_items());
  }, [dispatch]);

  useEffect(() => {
    dispatch(get_total());
  }, [dispatch]);

  useEffect(() => {
    dispatch(get_item_total());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      {/* <ToastContainer autoClose={5000} /> */}
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
