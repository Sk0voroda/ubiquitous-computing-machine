import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import clsx from 'classix';

import { Spinner } from '../../components/common/Loader';

import ErrorIcon from './../../assets/images/error-icon.svg?url';

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'email is required' })
    .email({ message: 'email must be valid' }),
  password: z.string().min(1, { message: 'password is required' }),
});

type LoginValues = z.infer<typeof LoginSchema>;

export const LoginView = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginValues> = async ({ email, password }) => {
    setSubmitError(null);

    try {
      navigate('/wontdo');
    } catch (error) {
      const err = error as any;

      if (err.status === 400) {
        setSubmitError('Incorrect email or password');
      } else {
        setSubmitError('Something went wrong');
      }
    }
  };

  return (
    <div className="h-full w-full ">
      <div className="mx-auto mt-32 max-w-[22rem] rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-3">
          <h3 className="font-mono text-lg font-bold">
            Log in to your account
          </h3>
        </div>
        {submitError && (
          <div
            className="mb-3 flex items-center
           rounded border border-red-600 bg-red-200 p-2 text-sm"
          >
            <img src={ErrorIcon} alt="error" className="mr-2 h-6 w-6" />
            {submitError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              {...register('email')}
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email address"
              className={`focus-outline form-input h-9 w-full rounded border border-solid border-gray-300 bg-white px-2 py-1 font-sans text-sm text-gray-700 transition duration-100 ease-in-out hover:border-blue-400 focus:border-blue-400 focus:text-gray-700 focus:shadow-none focus:ring-0 ${clsx(
                errors.email && 'input-errors'
              )}`}
            />
            {errors.email && (
              <div className="mt-1 flex items-center">
                <img src={ErrorIcon} alt="error" className="mr-1 h-4 w-4" />
                <p className="text-xs lowercase text-red-600">
                  {errors.email.message}
                </p>
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              {...register('password')}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className={`focus-outline form-input h-9 w-full rounded border border-solid border-gray-300 bg-white px-2 py-1 font-sans text-sm text-gray-700 transition duration-100 ease-in-out hover:border-blue-400 focus:border-blue-400 focus:text-gray-700 focus:shadow-none focus:ring-0 ${clsx(
                errors.password && 'input-errors'
              )}`}
            />
            {errors.password && (
              <div className="mt-1 flex items-center">
                <img src={ErrorIcon} alt="error" className="mr-1 h-4 w-4" />
                <p className="text-xs lowercase text-red-600">
                  {errors.password.message}
                </p>
              </div>
            )}
          </div>
          {/* TODO: add remember me, and forgot pass */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="focus-outline inline-block h-9 w-full rounded bg-blue-600 px-7 py-1 text-base font-medium capitalize text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:ring-0 active:bg-blue-800 active:shadow-lg"
          >
            log in
          </button>
        </form>
        {isSubmitting && (
          <div className="mt-3 flex items-center justify-center">
            <div className="mr-2 h-6 w-6">
              <Spinner />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
