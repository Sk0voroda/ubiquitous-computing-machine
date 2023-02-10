import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import clsx from 'classix';

import { supabase } from '../../services';
import { Spinner } from '../../components/common/Loader';

import ErrorIcon from './../../assets/images/error-icon.svg?url';

const SignUpSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  email: z
    .string()
    .min(1, { message: 'email is required' })
    .max(50)
    .email({ message: 'email must be valid' }),
  password: z.string().min(1, { message: 'password is required' }),
});

type SignUpValues = z.infer<typeof SignUpSchema>;

export const SignUpView = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(SignUpSchema),
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SignUpValues> = async ({ email, password }) => {
    setSubmitError(null);

    try {
      await supabase.auth.signUp({ email, password });

      navigate('/wontdo');
    } catch (error) {
      const err = error as any;
      console.log(err);

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
          <h3 className="font-mono text-lg font-bold">Sign Up</h3>
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
            <label htmlFor="name" className="font-mono text-xs text-blue-600">
              name
            </label>
            <input
              {...register('name')}
              type="text"
              name="name"
              id="name"
              placeholder="Enter a name"
              className={`focus-outline form-input h-9 w-full rounded border border-solid border-gray-300 bg-white px-2 py-1 font-sans text-sm text-gray-700 transition duration-100 ease-in-out hover:border-blue-400 focus:border-blue-400 focus:text-gray-700 focus:shadow-none focus:ring-0`}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="font-mono text-xs text-blue-600">
              email
              <span className="ml-0.5 align-top text-xs text-red-600">*</span>
            </label>
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
            <label
              htmlFor="password"
              className="font-mono text-xs text-blue-600"
            >
              password
              <span className="ml-0.5 align-top text-xs text-red-600">*</span>
            </label>
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
            sign up
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
