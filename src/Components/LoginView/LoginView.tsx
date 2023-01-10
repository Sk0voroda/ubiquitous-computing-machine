import { useState } from 'react';
import clsx from 'clsx';

import { collection } from '../../services';

// TODO: maybe add focus border

export const LoginView = () => {
  const [page, setPage] = useState<'sign in' | 'sign up'>('sign in');

  // TODO: change
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await collection('users').authWithPassword('test@test.com', '123123123');
  };

  return (
    <div className="transiton fixed inset-0 z-10 h-full w-full overflow-y-auto bg-stone-100 bg-opacity-50">
      <div className="z-20 mx-auto mt-20 w-64 rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-3">
          <ul className="flex flex-wrap">
            <li
              tabIndex={0}
              className={`flex-1 cursor-pointer p-2 text-center font-mono lowercase transition duration-150 ease-in-out hover:bg-stone-100 focus:outline-blue-600 ${clsx(
                {
                  'cursor-default border-t-2 border-blue-600 text-blue-600 hover:bg-white':
                    page === 'sign in',
                }
              )}`}
              onClick={() => setPage('sign in')}
            >
              Sign in
            </li>
            <li
              tabIndex={0}
              className={`flex-1 cursor-pointer p-2 text-center font-mono lowercase transition duration-150 ease-in-out hover:bg-stone-100 focus:outline-blue-600 ${clsx(
                {
                  'cursor-default border-t-2 border-blue-600 text-blue-600 hover:bg-white':
                    page === 'sign up',
                }
              )}`}
              onClick={() => setPage('sign up')}
            >
              Sign up
            </li>
          </ul>
        </div>
        <form>
          <div className="mb-6">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="input-styled"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="input-styled"
            />
          </div>
          {/* TODO: add remember me, and forgot pass */}
          <button
            type="submit"
            onClick={onSubmit}
            className="inline-block w-full rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
          >
            sign in
          </button>
        </form>
      </div>
    </div>
  );
};
