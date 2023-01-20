import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import clsx from 'clsx';

import { collection, authStore } from '../../services';

import { Routes } from '../../routes';

const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginValues = z.infer<typeof LoginSchema>;

export const LoginView = () => {
  const location = useLocation();

  const { pathname } = location;
  const isLoginPage = pathname === Routes.Login;
  const logged = authStore.isValid;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    // await collection('users').authWithPassword('test@test.com', '123123123');
    console.log('onSubmit', data);
  };

  return (
    <div className="h-full w-full ">
      <div className="mx-auto mt-20 max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-3">
          <h3 className="font-mono text-lg font-bold">
            Log in to your account
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              {...register('email')}
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email address"
              className="input-styled"
            />
          </div>
          <div className="mb-3">
            <input
              {...register('password')}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="input-styled"
            />
          </div>
          {/* TODO: add remember me, and forgot pass */}
          <button
            type="submit"
            className="focus-outline inline-block h-9 w-full rounded bg-blue-600 px-7 py-1 text-base font-medium capitalize text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:ring-0 active:bg-blue-800 active:shadow-lg"
          >
            log in
          </button>
        </form>
      </div>
    </div>
  );
};
