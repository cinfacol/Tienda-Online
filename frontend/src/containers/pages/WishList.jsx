import Layout from '../../hocs/Layout';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_wishlist_items, get_wishlist_item_total, remove_wishlist_item } from '../../features/services/wishlist/wishlist.service';
import WishlistItem from '../../components/cart/WishlistItem';

const Wishlist = () => {

  const dispatch = useDispatch();
  const wishlist_items = useSelector(state => state.wishlist.items);
  const total_wishlist_items = useSelector(state => state.wishlist.total_items);
  const [render, setRender] = useState(false);

  useEffect(() => {
    dispatch(get_wishlist_items());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(get_wishlist_item_total());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showWishlistItems = () => {
    return (
      <div>
        {
          wishlist_items &&
          wishlist_items !== null &&
          wishlist_items !== undefined &&
          wishlist_items.length !== 0 &&
          wishlist_items.map((item, index) => {
            let count = item.count;
            return (
              <div key={index}>
                <WishlistItem
                  item={item}
                  count={count}
                  remove_wishlist_item={remove_wishlist_item}
                  render={render}
                  setRender={setRender}
                />
              </div>
            );
          })
        }
      </div>
    )
  }

  return (
    <Layout>
      <div className='bg-white pt-4'>
        <div className='max-w-2xl mx-auto pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h1 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>Wish List Items ({total_wishlist_items})</h1>
          <div className='mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16'>
            <section aria-labelledby='wishlist-heading' className='lg:col-span-7'>
              <h2 id='wishlist-heading' className='sr-only'>
                Items in your wishlist
              </h2>
              <ul className='border-t border-b border-gray-200 divide-y divide-gray-200'>
                {showWishlistItems()}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Wishlist
