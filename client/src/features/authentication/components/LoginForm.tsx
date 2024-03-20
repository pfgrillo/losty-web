import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHook';
import { selecError, selectUser } from '../../../store/features/authSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginChunk } from '../services/auth.service';

export interface AuthForm {
  username: string;
  password: string;
  confirmPassword?: string;
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthForm>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const authError = useAppSelector(selecError);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit: SubmitHandler<AuthForm> = async (data: AuthForm) => {
    dispatch(loginChunk(data));
  };

  return (
    <>
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 focus:z-10 sm:text-sm mb-4 ${errors.username ? 'border-red-500' : ''
                    }`}
                  placeholder="Username"
                  {...register('username', {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.username && (
                  <div className="bg-red-400 px-3 py-2 text-center rounded-md text-white mt-4 mb-4">
                    {errors.username.message}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 focus:z-10 sm:text-sm mb-4 ${errors.password ? 'border-red-500' : ''
                    }`}
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                {errors.password && (
                  <div className="bg-red-400 px-3 py-2 text-center rounded-md text-white mt-4">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>
            {authError && (
              <div className="bg-red-400 px-3 py-2 text-center rounded-md text-white mt-4">
                {authError}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/todo"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginForm;
