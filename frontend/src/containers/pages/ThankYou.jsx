import Layout from '../../hocs/Layout';
import { Navigate } from 'react-router';
import { reset } from '../../features/payment/paymentSlice';
import { empty_cart } from '../../features/services/cart/cart.service';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const ThankYou = () => {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.user.isLoggedIn);

  useEffect(() => {
    dispatch(reset());
    dispatch(empty_cart());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isAuthenticated)
    return <Navigate to='/' />;

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Gracias por tu compra
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Confiamos en que <strong>"Eline Shop"</strong> continuará siendo tu tienda online, favorita.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ThankYou
