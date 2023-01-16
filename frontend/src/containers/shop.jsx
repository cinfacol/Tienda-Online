import Layout from '../hocs/Layout';
import { get_products, get_filtered_products } from '../features/services/products/products.service';
import { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { FilterIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import ProductCard from '../components/product/ProductCard';
import { prices } from '../helpers/fixedPrices';

const Shop = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(get_products());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const products = useSelector(state => state.products.products);
  const filtered_products = useSelector(state => state.products.filtered_products);
  const filtered_no_products = useSelector(state => state.products.error);
  const categories = useSelector(state => state.categories.categories);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filtered, setFiltered] = useState(false);
  const [formData, setFormData] = useState({
    category_id: '0',
    price_range: 'Any',
    sort_by: 'created',
    order: 'desc'
  });
  const {
    category_id,
    price_range,
    sort_by,
    order
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    window.scrollTo(0, 0);
    dispatch(get_filtered_products({category_id, price_range, sort_by, order}));
    setFiltered(true);
  }

  const showProducts = () => {
    let results = []
    let display = []

    if (
      filtered_products &&
      filtered_products !== null &&
      filtered_products !== undefined &&
      filtered
    ) {
      filtered_products.map((product, index) => {
        return display.push(
          <div key={index}>
            <ProductCard product={product} />
          </div>
        );
      });
    } else if (
      !filtered &&
      products &&
      products !== null &&
      products !== undefined
    ) {
      products.map((product, index) => {
        return display.push(
          <div key={index}>
            <ProductCard product={product} />
          </div>
        );
      });
    } else {
      return (
        <div >
          <h1>{filtered_no_products}</h1>
      </div>
      )

    }

    for (let i = 0; i < display.length; i += 3) {
      results.push(
        <div key={i} className='grid md:grid-cols-3 '>
          {display[i] ? display[i] : <div className=''></div>}
          {display[i + 1] ? display[i + 1] : <div className=''></div>}
          {display[i + 2] ? display[i + 2] : <div className=''></div>}
        </div>
      )
    }

    return results

  }

  return (
    <Layout>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog - OCULTO PARA PC */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Mobile Filters */}
                  <form onSubmit={e => onSubmit(e)} className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul className="font-medium text-gray-900 px-2 py-3">
                      {
                        categories &&
                        categories !== null &&
                        categories !== undefined && (
                          categories.map((category) => {
                            if (category.sub_categories.length === 0) {
                              return (
                                <div key={category.id} className=' flex items-center h-5 my-5'>
                                  <input
                                    name='category_id'
                                    onChange={e => onChange(e)}
                                    value={category.id.toString()}
                                    type='radio'
                                    className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                  />
                                  <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                    {category.name}
                                  </label>
                                </div>
                              )
                            } else {
                              let result = []
                              result.push(
                                <div key={category.id} className='flex items-center h-5'>
                                  <input
                                    name='category_id'
                                    onChange={e => onChange(e)}
                                    value={category.id.toString()}
                                    type='radio'
                                    className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                  />
                                  <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                    {category.name}
                                  </label>
                                </div>
                              )

                              // eslint-disable-next-line array-callback-return
                              category.sub_categories.map(sub_category => {
                                result.push(
                                  <div key={sub_category.id} className='flex items-center h-5 ml-2 my-5'>
                                    <input
                                      name='category_id'
                                      onChange={e => onChange(e)}
                                      value={sub_category.id.toString()}
                                      type='radio'
                                      className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                    />
                                    <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                      {sub_category.name}
                                    </label>
                                  </div>
                                )
                              })

                              return result
                            }
                          })
                        )
                      }
                    </ul>

                    <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-sofiapro-regular text-gray-900">Prices</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {
                                  prices && prices.map((price, index) => {
                                    if (price.id === 0) {
                                      return (
                                        <div key={index} className='form-check'>
                                          <input
                                            onChange={e => onChange(e)}
                                            value={price.name}
                                            name='price_range'
                                            type='radio'
                                            className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                            defaultChecked
                                          />
                                          <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light'>{price.name}</label>
                                        </div>
                                      )
                                    } else {
                                      return (
                                        <div key={index} className='form-check'>
                                          <input
                                            onChange={e => onChange(e)}
                                            value={price.name}
                                            name='price_range'
                                            type='radio'
                                            className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                          />
                                          <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light'>{price.name}</label>
                                        </div>
                                      )
                                    }
                                  })
                                }
                              </div>
                            </Disclosure.Panel>
                          </h3>
                        </>
                      )}
                    </Disclosure>

                    <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-sofiapro-regular text-gray-900">Mas Filtros</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                <div className='form-group '>
                                  <label htmlFor='sortBy' className='mr-3 min-w-0 flex-1 text-gray-500'
                                  >Ver por</label>
                                  <select
                                    className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                    id='sortBy'
                                    name='sortBy'
                                    onChange={e => onChange(e)}
                                    value={sort_by}
                                  >
                                    <option value='date_created'>Fecha</option>
                                    <option value='price'>Precio</option>
                                    <option value='sold'>Sold</option>
                                    <option value='title'>Nombre</option>

                                  </select>
                                </div>
                                <div className='form-group'>
                                  <label htmlFor='order' className='mr-3 min-w-0 flex-1 text-gray-500'
                                  >Orden</label>
                                  <select
                                    className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                    id='order'
                                    name='order'
                                    onChange={e => onChange(e)}
                                    value={order}
                                  >
                                    <option value='asc'>A - Z</option>
                                    <option value='desc'>Z - A</option>
                                  </select>
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </h3>
                        </>
                      )}
                    </Disclosure>

                    <button
                      type="submit"
                      className="float-right inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Buscar
                    </button>
                  </form>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>

          {/* OCULTO PARA MOBILES */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Shop</h1>

              <div className="flex items-center">
                <button
                  type="button"
                  className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FilterIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-8 gap-y-10">
                {/* Filters */}
                <form onSubmit={e => onSubmit(e)} className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                    {
                      categories &&
                      categories !== null &&
                      categories !== undefined && (
                        categories.map(category => {
                          if (category.sub_categories.length === 0) {
                            return (
                              <div key={category.id} className=' flex items-center h-5 my-5'>
                                <input
                                  name='category_id'
                                  onChange={e => onChange(e)}
                                  value={category.id.toString()}
                                  type='radio'
                                  className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                />
                                <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                  {category.name}
                                </label>
                              </div>
                            )
                          } else {
                            let result = []
                            result.push(
                              <div key={category.id} className='flex items-center h-5'>
                                <input
                                  name='category_id'
                                  onChange={e => onChange(e)}
                                  value={category.id.toString()}
                                  type='radio'
                                  className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                />
                                <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                  {category.name}
                                </label>
                              </div>
                            )
                            // eslint-disable-next-line array-callback-return
                            category.sub_categories.map(sub_category => {
                              result.push(
                                <div key={sub_category.id} className='flex items-center h-5 ml-2 my-5'>
                                  <input
                                    name='category_id'
                                    onChange={e => onChange(e)}
                                    value={sub_category.id.toString()}
                                    type='radio'
                                    className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                  />
                                  <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                    {sub_category.name}
                                  </label>
                                </div>
                              )
                            })
                            return result
                          }
                        })
                      )
                    }
                  </ul>

                  <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                            <span className="font-sofiapro-regular text-gray-900">Prices</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                          <Disclosure.Panel className="pt-6">
                            {<div className="space-y-6">
                              {
                                prices && prices.map((price, index) => {
                                  if (price.id === 0) {
                                    return (
                                      <div key={index} className='form-check'>
                                        <input
                                          onChange={e => onChange(e)}
                                          value={price.name}
                                          name='price_range'
                                          type='radio'
                                          className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                          defaultChecked
                                        />
                                        <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light'>{price.name}</label>
                                      </div>
                                    )
                                  } else {
                                    return (
                                      <div key={index} className='form-check'>
                                        <input
                                          onChange={e => onChange(e)}
                                          value={price.name}
                                          name='price_range'
                                          type='radio'
                                          className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                        />
                                        <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light'>{price.name}</label>
                                      </div>
                                    )
                                  }
                                })
                              }
                            </div>}
                          </Disclosure.Panel>
                        </h3>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                            <span className="font-sofiapro-regular text-gray-900">Mas Filtros</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              <div className='form-group '>
                                <label htmlFor='sortBy' className='mr-3 min-w-0 flex-1 text-gray-500'
                                >Ver por</label>
                                <select
                                  className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                  id='sortBy'
                                  name='sortBy'
                                  onChange={e => onChange(e)}
                                  value={sort_by}
                                >
                                  <option value='date_created'>Fecha</option>
                                  <option value='price'>Precio</option>
                                  <option value='sold'>Sold</option>
                                  <option value='title'>Nombre</option>

                                </select>
                              </div>
                              <div className='form-group'>
                                <label htmlFor='order' className='mr-3 min-w-0 flex-1 text-gray-500'
                                >Orden</label>
                                <select
                                  className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                  id='order'
                                  name='order'
                                  onChange={e => onChange(e)}
                                  value={order}
                                >
                                  <option value='asc'>A - Z</option>
                                  <option value='desc'>Z - A</option>
                                </select>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </h3>
                      </>
                    )}
                  </Disclosure>

                  <button
                    type="submit"
                    className="float-right inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Buscar
                  </button>
                </form>

                {/* Product grid */}
                <div className="lg:col-span-4">
                  {products && showProducts()}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  )
}

export default Shop
