import { Link, Outlet } from 'react-router-dom';

import BrainLogo from './../../assets/images/the-brain-logo.svg?url';

export const RootLayout = () => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 overflow-hidden bg-white font-mono text-blue-600 shadow-md">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-1 px-3">
          <Link
            className="focus-outline flex items-center p-1 font-medium lg:items-center lg:justify-center"
            to={'/'}
          >
            <img src={BrainLogo} className="h-8 w-8" />
            <span className="invisible ml-0 w-0 text-xl sm:visible sm:ml-3 sm:w-auto">
              WONTDO
            </span>
          </Link>
          <p className="text-sm font-thin">
            <span className="invisible mr-0 text-xs text-black sm:visible sm:mr-2">
              Don't have an account?
            </span>
            <Link
              className="focus-outline p-1 underline decoration-1 underline-offset-2 hover:no-underline hover:decoration-0"
              to={'/registration'}
            >
              Sign up
            </Link>
          </p>
        </div>
      </header>
      <main className="flex h-screen overflow-auto bg-stone-100">
        <Outlet />
      </main>
    </>
  );
};
