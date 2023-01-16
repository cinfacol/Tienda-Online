import Layout from '../../hocs/Layout';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNotification } from '../../hooks/useNotification';
import {
  remove_item,
  update_item,
  get_items,
  get_total,
  get_item_total
} from '../../features/services/cart/cart.service';
import CartItem from '../../components/cart/CartItem';
import { Link } from 'react-router-dom';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
const Cart = () => {

  const amount = useSelector(state => state.cart.amount.total_cost);
  const guest_amount = useSelector(state => state.cart.amount[0]);
  let shipping = 5;
  let tax = 8.32;
  let guest_order_total = parseFloat(guest_amount) + parseFloat(shipping) + parseFloat(tax);
  let order_total = parseFloat(amount) + parseFloat(shipping) + parseFloat(tax);
  // const compare_amount = useSelector(state => state.cart.compare_amount);
  const total_items = useSelector(state => state.cart.total_items);
  const items = useSelector(state => state.cart.items);
  const isAuthenticated = useSelector(state => state.auth.user.isLoggedIn);
  // const { displayNotification } = useNotification();

  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(get_items());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  useEffect(() => {
    dispatch(get_total());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  useEffect(() => {
    dispatch(get_item_total());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const showItems = () => {
    if (items.length !== 0) {
      return (
        <div>
          {Array.isArray(items) ?
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
                  />
                </div>
              );
            }) : 'No es un Array'
          }
        </div>
      )
    } else {
      return (
        <div>
          No has agregado productos en tu carrito de compras
        </div>
      )
    }
  }

  const checkoutButton = () => {
    if (total_items < 1) {
      return (
        <>
          <Link
            to='/shop'
          >
            <button
              className='w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'
            >
              Buscar items
            </button>
          </Link>
        </>
      )
    } else if (!isAuthenticated) {
      return (
        <>
          <Link
            to='/login'
          >
            <button
              className='w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'
            >
              Login
            </button>
          </Link>
        </>
      )
    } else {
      return (
        <>
          <Link
            to='/checkout'
          >
            <button
              className='w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'
            >
              Checkout
            </button>
          </Link>
        </>
      )

    }
  }
  return (
    <Layout>
      <div className='bg-white'>
        <div className='max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h1 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>Shopping Cart Items ({total_items})</h1>
          <div className='mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16'>
            <section aria-labelledby='cart-heading' className='lg:col-span-7'>
              <h2 id='cart-heading' className='sr-only'>
                Items in your shopping cart
              </h2>
              <ul className='border-t border-b border-gray-200 divide-y divide-gray-200'>
                {showItems()}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby='summary-heading'
              className='mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5'
            >
              <h2 id='summary-heading' className='text-lg font-medium text-gray-900'>
                Order summary
              </h2>
              <dl className='mt-6 space-y-4'>
                <div className='flex items-center justify-between'>
                  <dt className='text-sm text-gray-600'>Subtotal</dt>
                  {isAuthenticated ?
                    <dd className='text-sm font-medium text-gray-900'>${amount && amount.toFixed(2)}</dd> :
                    <dd className='text-sm font-medium text-gray-900'>${guest_amount && guest_amount.toFixed(2)}</dd>
                  }
                </div>
                <div className='border-t border-gray-200 pt-4 flex items-center justify-between'>
                  <dt className='flex items-center text-sm text-gray-600'>
                    <span>Shipping estimate</span>
                    <Link to='/' className='ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500'>
                      <span className='sr-only'>Learn more about how shipping is calculated</span>
                      <QuestionMarkCircleIcon className='h-5 w-5' aria-hidden='true' />
                    </Link>
                  </dt>
                  <dd className='text-sm font-medium text-gray-900'>$ {shipping.toFixed(2)} </dd>
                </div>
                <div className='border-t border-gray-200 pt-4 flex items-center justify-between'>
                  <dt className='flex text-sm text-gray-600'>
                    <span>Tax estimate</span>
                    <Link to='/' className='ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500'>
                      <span className='sr-only'>Learn more about how tax is calculated</span>
                      <QuestionMarkCircleIcon className='h-5 w-5' aria-hidden='true' />
                    </Link>
                  </dt>
                  <dd className='text-sm font-medium text-gray-900'>$ {tax.toFixed(2)} </dd>
                </div>
                <div className='border-t border-gray-200 pt-4 flex items-center justify-between'>
                  <dt className='text-base font-medium text-gray-900'>Order total</dt>
                  {isAuthenticated ?
                    <dd className='text-base font-medium text-gray-900'>${order_total && order_total.toFixed(2)}</dd> :
                    <dd className='text-base font-medium text-gray-900'>${guest_order_total && guest_order_total.toFixed(2)}</dd>
                  }
                </div>
              </dl>
              <div className='mt-6'>
                {checkoutButton()}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart
