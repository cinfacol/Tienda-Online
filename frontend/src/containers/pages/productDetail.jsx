import Layout from '../../hocs/Layout';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Disclosure, RadioGroup, Tab } from '@headlessui/react';
import {
  MinusSmIcon,
  PlusSmIcon,
  CheckCircleIcon,
  XCircleIcon } from '@heroicons/react/outline';
import { get_product } from '../../features/services/products/products.service';
import { add_item,
  get_item_total,
  get_total } from '../../features/services/cart/cart.service';
import { get_wishlist_items, get_wishlist_item_total} from '../../features/services/wishlist/wishlist.service';
import { get_reviews,
  create_review,
  update_review,
  filter_reviews,
  get_review} from '../../features/services/reviews.js/reviews.service';
import { Oval } from 'react-loader-spinner';
import { useNotification } from '../../hooks/useNotification';
import WishlistHeart from '../../components/product/WishlistHeart';
import Stars from '../../components/product/Stars';

/* const producto = {
  rating: 4,
} */

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
  const params = useParams();
  const productId = params.productId;

  const reviews = useSelector(state => state.reviews.reviews);
  const review = useSelector(state => state.reviews.review);
  const isAuthenticated = useSelector(state => state.auth.user.isLoggedIn);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(get_product(productId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(get_wishlist_items());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(get_wishlist_item_total());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(get_reviews(productId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(get_review(productId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const product = useSelector(state => state.products.product);
  const cart = useSelector(state => state.cart);
  const { displayNotification } = useNotification();

  const first_color = product && product.color[0] && product.color[0].data;

  const [selectedColor, setSelectedColor] = useState(first_color);

  const colores = product && product.color;
  // const wishlist = useSelector(state => state.wishlist.items);
  // const wishlist_total = useSelector(state => state.wishlist.total_items);

  let loading = false;

  const isLoading = useSelector(state => state.cart.status)

  if (isLoading === 'pending') {
    loading = true
  }

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAddToCart = e => {
    e.preventDefault()
    if (
      product &&
      product !== null &&
      product !== undefined &&
      product.quantity > 0
      ) {
      dispatch(
        add_item({product}),
        get_total(),
        get_item_total()
      );

      const cart_error = cart.error
      if (cart_error) {
        displayNotification({ message: `${cart_error.error}`, type: 'error' });
      }
      navigate('/cart');
    }
  }

  // const [rating, setRating] = useState(5.0);

  const [formData, setFormData] = useState({
    comment: '',
    rating: '',
  })

  const { comment, rating } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const leaveReview = e => {
    e.preventDefault()
    if (rating !== null)
      dispatch(create_review({productId, rating, comment}));
  }

  const updateReview = e => {
    e.preventDefault()
    if (rating !== null)
      dispatch(update_review({productId, rating, comment}));
  }

  /* const deleteReview = () => {
    const fetchData = async () => {
      await dispatch(delete_review(productId));
      await dispatch(get_review(productId));
      // setRating(5.0);
      setFormData({
        comment: ''
      });
    };
    fetchData();
  }; */

  const filterReviews = (rating) => {
    dispatch(filter_reviews({productId, rating}));
  };

  const getReviews = () => {
    dispatch(get_reviews(productId));
  };

  let promedio = []

  const getMediaReviews = () => {
    <>
      {reviews && Array.isArray(reviews) ? reviews.map((review) => (
        <div key = {review.id}>
          {
            promedio.push(review.rating)
          }
        </div>
      )
      ) : ''}
    </>
  }
  reviews && getMediaReviews();

  let sum = promedio.reduce((previous, current) => current += previous, 0);
  let media_rating = sum / promedio.length;

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product && product.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{image.name}</span>
                          <span className="absolute inset-0 rounded-md overflow-hidden">
                            <img src={image.get_thumbnail} alt="" className="w-full h-full object-center object-cover" />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-indigo-500' : 'ring-transparent',
                              'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              {/* imagen del producto */}
              <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                {product && product.images.map((image) => (
                  <Tab.Panel key={image.id}>
                    <img
                      src={image.get_thumbnail}
                      alt={image.alt_text}
                      className="w-full h-full object-center object-cover sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product && product.name}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">$ {product && product.price}</p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div>
                    {<Stars rating={media_rating} />} {promedio.length} {(promedio.length === 1) ? 'reseña' : 'reseñas' }
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{ __html: product && product.description }}
                />
              </div>
              {(colores && colores.length !== 0) && (
                <div>
                  <h3 className="text-sm text-gray-900 mt-5">Colores Disponibles:</h3>

                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {colores && Array.isArray(colores) ? colores.map((color) => (
                        <RadioGroup.Option
                          key={color.data.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.data.selectedColor,
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="p" className="sr-only">
                            {color.data.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.data.bgColor,
                              'h-8 w-8 border border-black border-opacity-10 rounded-full'
                            )}
                          />
                        </RadioGroup.Option>
                      )) : 'No es un array'
                      }
                    </div>
                  </RadioGroup>
                </div>
              )}
              <p className="mt-2">
                {
                  product &&
                  product !== null &&
                  product !== undefined &&
                  product.quantity > 0 ?
                  (
                    <>
                      <span className='flex text-green-500'>
                        Producto Disponible
                        <CheckCircleIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                      </span>
                    </>
                  ) :
                  (
                    <span className='flex text-red-500'>
                      Producto Agotado
                      <XCircleIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    </span>
                  )
                }
              </p>
              <div className="mt-4 flex sm:flex-col1">
                <form onSubmit={e => handleAddToCart(e)} className="mt-6">
                    {loading ?
                      <button
                        className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
                        <Oval
                          color="#fff"
                          width={20}
                          height={20} />
                      </button>
                      :
                      <button
                        // onClick={addToCart}
                        type='submit'
                        className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
                        Agregar al Carrito
                      </button>
                    }
                </form>
                <WishlistHeart />
              </div>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="border-t divide-y divide-gray-200">
                  {product && product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                              <span
                                className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
                            <ul>
                              {detail.item.map((item) => (
                                <li key={item.id}>{item.item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
            <section className='my-5 max-w-7xl'>
              <div className="grid grid-cols-5">
                <div className="col-span-2">
                  <div>
                    <button
                      className='btn btn-primary btn-sm mb-3 ml-6 mt-2 font-sofiapro-light'
                      onClick={getReviews}
                    >
                      Mostrar todas
                    </button>
                    <div
                      className='mb-1'
                      style={{ cursor: 'pointer' }}
                      onClick={() => filterReviews(5)}
                    >
                      <Stars rating={5.0} />
                    </div>
                    <div
                      className='mb-1'
                      style={{ cursor: 'pointer' }}
                      onClick={() => filterReviews(4.0)}
                    >
                      <Stars rating={4.0} />
                    </div>
                    <div
                      className='mb-1'
                      style={{ cursor: 'pointer' }}
                      onClick={() => filterReviews(3.0)}
                    >
                      <Stars rating={3.0} />
                    </div>
                    <div
                      className='mb-1'
                      style={{ cursor: 'pointer' }}
                      onClick={() => filterReviews(2.0)}
                    >
                      <Stars rating={2.0} />
                    </div>
                    <div
                      className='mb-1'
                      style={{ cursor: 'pointer' }}
                      onClick={() => filterReviews(1.0)}
                    >
                      <Stars rating={1.0} />
                    </div>
                  </div>
                  {
                    isAuthenticated ?
                      review &&
                      review.id  ?
                      <form onSubmit={e => updateReview(e)}>
                        <div>
                          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                            Edit your review
                          </label>
                          <div className="mt-1">
                            <textarea
                              rows={4}
                              name="comment"
                              id="comment"
                              required
                              value={comment}
                              onChange={e => onChange(e)}
                              placeholder={review.comment}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            // defaultValue={''}
                            />
                          </div>
                        </div>
                        <select
                          name="rating"
                          className="mt-4 float-right"
                          required
                          value={rating}
                          onChange={e => onChange(e)}
                          placeholder="0 - 5">
                          <option defaultValue="">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <button
                          type="submit"
                          className="mt-4  inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Update
                        </button>
                      </form> :
                      <form onSubmit={e => leaveReview(e)}>
                        <div>
                          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                            Add your review
                          </label>
                          <div className="mt-1">
                            <textarea
                              rows={4}
                              name="comment"
                              id="comment"
                              required
                              value={comment}
                              onChange={e => onChange(e)}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            // defaultValue={''}
                            />
                          </div>
                        </div>
                        <select
                          name="rating"
                          className="mt-4 float-right"
                          required
                          value={rating}
                          onChange={e => onChange(e)}
                          placeholder="0 - 5">
                          <option defaultValue="">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <button
                          type="submit"
                          className="mt-4  inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Add
                        </button>
                      </form>
                    : ''
                  }
                </div>
                <div className="col-span-3">
                  {
                    reviews &&
                    Array.isArray(reviews) ?
                    reviews.map((review) => (
                      <div key={review.id}>
                        <div className="flex">
                          <div className="mx-4 flex-shrink-0">
                            <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold">{review.user}</h4>
                            <Stars rating={review.rating} />
                            <p className="mt-1">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    )) : <></>
                  }
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>

  )
}
