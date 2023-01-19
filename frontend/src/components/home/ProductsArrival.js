import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { get_products_by_arrival } from '../../features/services/products/products.service';


export default function ProductsArrival() {

  const products_arrival = useSelector(state => state.arrival.products_arrival);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(get_products_by_arrival());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Lo mas reciente</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {
            products_arrival &&
            products_arrival !== null &&
            products_arrival !== undefined &&
            products_arrival.map((product) => (
              <div key={product.id}>
                <Link to={`product/${product.id}`} className="group">
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={product.images[0].get_thumbnail}
                      alt={product.name}
                      className='w-full h-full object-center object-cover lg:w-full lg:h-full'
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">$ {product.price}</p>
                </Link>
              </div>
            ))
          }
        </div>
        <div>
          <Link  to='/shop' className='mt-4 hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'>
            Más productos ...<span aria-hidden='true'> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
