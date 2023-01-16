import Layout from '../../hocs/Layout';
import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DropIn from 'braintree-web-drop-in-react';

import { useNotification } from '../../hooks/useNotification';

import CartItem from '../../components/cart/CartItem';

import ShippingForm from '../../components/checkout/ShippingForm';

import { check_coupon } from '../../features/services/coupons/coupons.service';
import { update_item, remove_item } from '../../features/services/cart/cart.service';
// import { refresh } from '../../features/services/auth/auth.service';
import { get_shipping_options } from '../../features/services/shipping/shipping.service';
import {
  get_payment_total,
  get_client_token,
  process_payment
} from '../../features/services/payment/payment.service';

import { Oval } from 'react-loader-spinner';
import { countries } from '../../helpers/fixedCountries';

const Checkout = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user.user);
  // const refresh = useSelector(state => state.auth.refresh)
  const isAuthenticated = useSelector(state => state.auth.user.isLoggedIn);
  const { displayNotification } = useNotification();
  const items = useSelector(state => state.cart.items);
  const shipping = useSelector(state => state.shipping.shipping);
  const loading = useSelector(state => state.payment.status);
  // const setAlert =
  const {
    clientToken,
    made_payment,
    original_price,
    total_after_coupon,
    total_amount,
    total_compare_amount,
    estimated_tax,
    shipping_cost
  } = useSelector(state => state.payment);

  const coupon = useSelector(state => state.coupons.coupon);

  const [formData, setFormData] = useState({
    full_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state_province_region: '',
    postal_zip_code: '',
    country_region: 'Colombia',
    telephone_number: '',
    coupon_name: '',
    shipping_id: 0,
  });

  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState({
    instance: {}
  });

  const {
    full_name,
    address_line_1,
    address_line_2,
    city,
    state_province_region,
    postal_zip_code,
    country_region,
    telephone_number,
    coupon_name,
    shipping_id,
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const buy = async e => {
    e.preventDefault();
    let nonce = await data.instance.requestPaymentMethod();

    if (coupon && coupon !== null && coupon !== undefined) {
      const coupon_name = coupon.name;
      dispatch(process_payment({
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
      }))
        .unwrap()
        .then(() => {
          displayNotification({message: 'El pago fue exitoso y se ha creado la orden', type: 'success'});
        })
        .catch((error) => {
          displayNotification({ message: 'hubo un error en el proceso', type: 'error' });
        });
    } else {
      dispatch(process_payment({
        nonce,
        shipping_id,
        coupon_name:'',
        full_name,
        address_line_1,
        address_line_2,
        city,
        state_province_region,
        postal_zip_code,
        country_region,
        telephone_number
      }))
        .unwrap()
        .then(() => {
          displayNotification({message: 'El pago fue exitoso y se ha creado la orden', type: 'success'});
        })
        .catch((error) => {
          displayNotification({ message: 'hubo un error en el proceso', type: 'error' });
        });
    }
  }

  const apply_coupon = async e => {
    e.preventDefault();

    dispatch(check_coupon(coupon_name));
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(get_shipping_options())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(get_client_token());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    // const defecto = 'default';
    if (coupon && coupon !== null && coupon !== undefined)
      dispatch(get_payment_total({shipping_id, coupon_name}));
    else
      dispatch(get_payment_total({ shipping_id, coupon_name: 'default' }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipping_id, coupon]);

  const [render, setRender] = useState(false);

  if (!isAuthenticated)
    return <Navigate to='/' />;

  const showItems = () => {
    return (
      <div>
        {
          items &&
          items !== null &&
          items !== undefined &&
          items.length !== 0 &&
          items.map((item, index) => {
            let count = item.count;
            return (
              <div key={index}>
                <CartItem
                  item={item}
                  count={count}
                  update_item={update_item}
                  remove_item={remove_item}
                  render={render}
                  setRender={setRender}
                  setAlert={displayNotification}
                />
              </div>
            );
          })
        }
      </div>
    )
  }

  const renderShipping = () => {
    return (
      <div className='mb-5'>
        {
          shipping &&
          shipping !== null &&
          shipping !== undefined &&
          shipping.length !== 0 &&
          shipping.map((shipping_option, index) => (
            <div key={index}>
              <input
                onChange={e => onChange(e)}
                value={shipping_option.id}
                name='shipping_id'
                type='radio'
                required
              />
              <label className='ml-4'>
                {shipping_option.name} - ${shipping_option.price} ({shipping_option.time_to_delivery})
              </label>
            </div>
          ))
        }
      </div>
    );
  };

  const renderPaymentInfo = () => {
    if (!clientToken) {
      if (!isAuthenticated) {
        <Link
          to="/login"
          className="w-full bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
        >
          Login
        </Link>
      } else {
        <button
          className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
        >
          <Oval
            color='#fff'
            height={20}
            widht={20}
          />
        </button>
      }
    } else {
      return (
        <>
          <DropIn
            options={{
              authorization: clientToken,
              paypal: {
                flow: 'vault'
              }
            }}
            onInstance={instance => (data.instance = instance)}
          />
          <div className="mt-6">
            {(loading === 'pending') ? <button
              className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              <Oval
                color='#fff'
                height={20}
                widht={20}
              />
            </button> :
              <button
                type="submit"
                className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500"
              >
                Place Order
              </button>}
          </div>
        </>
      )
    }
  }

  if (made_payment)
    return <Navigate to='/thankyou' />;

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Check Out</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {showItems()}
              </ul>
            </section>

            {/* Order summary */}

            <ShippingForm
              full_name={full_name}
              address_line_1={address_line_1}
              address_line_2={address_line_2}
              city={city}
              state_province_region={state_province_region}
              postal_zip_code={postal_zip_code}
              telephone_number={telephone_number}
              countries={countries}
              onChange={onChange}
              buy={buy}
              user={user}
              renderShipping={renderShipping}
              original_price={original_price}
              total_amount={total_amount}
              total_after_coupon={total_after_coupon}
              total_compare_amount={total_compare_amount}
              estimated_tax={estimated_tax}
              shipping_cost={shipping_cost}
              shipping_id={shipping_id}
              shipping={shipping}
              renderPaymentInfo={renderPaymentInfo}
              coupon={coupon}
              apply_coupon={apply_coupon}
              coupon_name={coupon_name}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Checkout
