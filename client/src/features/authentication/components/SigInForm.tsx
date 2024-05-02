import { useAppDispatch, useAppSelector } from '../../../hooks/storeHook';
import { selecError } from '../../../store/features/authSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginChunk } from '../services/auth.service';

export interface AuthForm {
  username: string;
  password: string;
  confirmPassword?: string;
}

const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthForm>();
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selecError);

  const onSubmit: SubmitHandler<AuthForm> = async (signInPayload: AuthForm) => {
    dispatch(loginChunk(signInPayload));
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
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 focus:z-10 sm:text-sm mb-4 ${errors.password ? 'border-red-500' : ''
                    }`}
                  placeholder="Confirm password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <div className="bg-red-400 px-3 py-2 text-center rounded-md text-white mt-4">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
            </div>
            {authError && (
              <div className="bg-red-400 px-3 py-2 text-center rounded-md text-white mt-4">
                {authError}
              </div>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignInForm;
