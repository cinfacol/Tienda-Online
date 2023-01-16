import Layout from '../../hocs/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { reset_password_confirm } from '../../features/services/auth/auth.service';
import { useNotification } from '../../hooks/useNotification';
import { Oval } from 'react-loader-spinner';

const ResetPasswordConfirm = () => {

  const dispatch = useDispatch();

  const params = useParams(); // uid, token

  const passwordReset = useSelector(state => state.auth.isPasswordReset);

  const { displayNotification } = useNotification();

  const loading = useSelector(state => state.auth.status);

  const initialValues = {
    new_password: '',
    re_new_password: '',
  };

  const validationSchema = Yup.object().shape({
    new_password: Yup.string()
      .test(
        'len',
        'The new_password must be between 6 and 40 characters.',
        (val) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required('This field is required!'),
    re_new_password: Yup.string()
      .required()
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
  });

  const handleResetPasswordConfirm = (formValue) => {
    const uid = params.uid;
    const token = params.token;
    const {
      new_password,
      re_new_password
    } = formValue;

    dispatch(reset_password_confirm({ uid, token, new_password, re_new_password }))
      .unwrap()
      .then(() => {
        displayNotification({message: 'La contraseña se ha restablecido correctamente', type: 'success'});
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        displayNotification({ message: 'Error al resetear tu contraseña', type: 'error' });
      });
  };

  return (
    <Layout>
      {
        passwordReset ? <Navigate to='/login' /> :
        <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <svg className='mx-auto w-12 h-12 text-gray-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd'></path>
            </svg>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
              <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Nueva Contraseña</h2>
            </div>
          </div>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleResetPasswordConfirm}
              >
                <Form>
                  <div>
                    <div className='mt-5'>
                      <label htmlFor='new_password' className='block text-sm font-medium text-gray-700'>
                        Contraseña
                      </label>
                      <div className='mt-1'>
                        <Field
                          name='new_password'
                          type='password'
                          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                          placeholder='Ingrese su nueva Contraseña'
                        />
                        <ErrorMessage
                          name='new_password'
                          component='div'
                          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'
                        />
                      </div>
                    </div>

                    <div className='mt-5'>
                      <label htmlFor='re_new_password' className='block text-sm font-medium text-gray-700'>
                        Confirmar Contraseña
                      </label>
                      <div className='mt-1'>
                        <Field
                          name='re_new_password'
                          type='password'
                          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                          placeholder='Repita la contraseña'
                        />
                        <ErrorMessage
                          name='re_new_password'
                          component='div'
                          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'
                        />
                      </div>
                    </div>
                    <div className='mt-5'>
                      {(loading === 'pending') ?
                        <button
                        type='button'
                          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                          <Oval
                            color='#fff'
                            width={20}
                            height={20}
                          />
                        </button> :
                        <button
                          type='submit'
                          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                          Reset Password
                        </button>
                      }
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      }
    </Layout>
  )
}

export default ResetPasswordConfirm;
