import { Link } from 'react-router-dom';

export default function ProductsSold({ data }) {
  return (
    <div className='bg-white'>
      <div className='max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:items-baseline sm:justify-between'>
          <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Los mas vendidos</h2>
          <Link  to='/' className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'>
            Browse all favorites<span aria-hidden='true'> &rarr;</span>
          </Link>
        </div>

        <div className='mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8'>
          {data &&
          data !== null &&
          data !== undefined &&
          data.map((product) => (
            <div key={product.id} className='group relative'>
              <div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
                <img
                  src={product.images[0].get_thumbnail}
                  alt={product.name}
                  className='w-full h-full object-center object-cover lg:w-full lg:h-full'
                />
              </div>
              <div className='mt-4 flex justify-between mx-2'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <Link to={`product/${product.id}`}>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <p className='text-sm font-medium text-gray-900'>$ {product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-6 sm:hidden'>
          <Link to='/' className='block text-sm font-semibold text-indigo-600 hover:text-indigo-500'>
            Ver mas productos<span aria-hidden='true'> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
