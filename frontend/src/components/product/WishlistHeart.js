import { useDispatch, useSelector } from "react-redux";
import { add_wishlist_item,
  get_wishlist_items,
  get_wishlist_item_total,
  remove_wishlist_item } from "../../features/services/wishlist/wishlist.service";
import { Navigate } from "react-router-dom";

const WishlistHeart = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.user.isLoggedIn);

  const addToWishlist = () => {
      if (isAuthenticated) {
          let isPresent = false;
          const product_id = product && product.id.toString();

              wishlist &&
              wishlist !== null &&
              wishlist !== undefined &&
              product &&
              product !== null &&
              product !== undefined &&
              // eslint-disable-next-line array-callback-return
              wishlist.map(item => {
              if (item.product.id.toString() === product_id) {
                  isPresent = true;
              }
              });

          if (isPresent) {
              dispatch(remove_wishlist_item(product_id));
              dispatch(get_wishlist_items());
              dispatch(get_wishlist_item_total());
          } else {
              dispatch(remove_wishlist_item(product.id));
              dispatch(add_wishlist_item(product_id));
              dispatch(get_wishlist_items());
              dispatch(get_wishlist_item_total());
          }

      } else {
          return <Navigate to="/login" />
      }
  };
  const product = useSelector(state => state.products.product);
  const wishlist = useSelector(state => state.wishlist.items);

  const renderWishlistHeart = () => {
    let selected = false;

    if (wishlist &&
    wishlist !== null &&
    wishlist !== undefined &&
    product &&
    product !== null &&
    product !== undefined) {
      // eslint-disable-next-line array-callback-return
      wishlist && wishlist !== null && wishlist.map(item => {
        if (item.product.id.toString() === product.id.toString()) {
          selected = true;
        }
      });
    }

    if (selected) {
      return (
        <button
          // onClick={addToWishlist}
          className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400  hover:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span className="sr-only">In favorites</span>
        </button>
      )
    } else {
      return (
        <button
          onClick={addToWishlist}
          className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="sr-only">Add to favorites</span>
        </button>
      )
    }
  }

  return (
    <>
      {renderWishlistHeart()}
    </>
  )
}

export default WishlistHeart
