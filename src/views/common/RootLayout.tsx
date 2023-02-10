import { Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'classix';

import BrainLogo from './../../assets/images/the-brain-logo.svg?url';

import { Routes } from '../../routes';

// TODO: change focus outline for header links
export const RootLayout = () => {
  const location = useLocation();

  const { pathname } = location;
  const isLoginPage = pathname === Routes.Login;
  const isMainPage = pathname === Routes.Main;
  const logged = false; //authStore.isValid;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 overflow-hidden bg-white font-mono text-blue-600 shadow-md">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-1 px-3">
          <Link
            className={`flex items-center p-1 font-medium lg:items-center lg:justify-center ${clsx(
              isMainPage && 'cursor-default'
            )}`}
            to={Routes.Main}
          >
            {/* TODO: add some img loading technics */}
            <img src={BrainLogo} className="h-10 w-10 sm:h-8 sm:w-8" />
            <span className="invisible ml-0 w-0 text-xl sm:visible sm:ml-3 sm:w-auto">
              WONTDO
            </span>
          </Link>
          {/* TODO: refactor this solid */}
          <p className="text-sm font-thin">
            {isMainPage && !logged && (
              <>
                <Link
                  className="mr-2 rounded p-2 underline decoration-1 underline-offset-2 hover:bg-gray-200 hover:no-underline hover:decoration-0"
                  to={Routes.Login}
                >
                  Sign in
                </Link>
                <Link
                  className="rounded bg-blue-500 p-2 text-white underline decoration-1 underline-offset-2 hover:bg-blue-700 hover:no-underline hover:decoration-0"
                  to={Routes.Signup}
                >
                  Sign up
                </Link>
              </>
            )}
            {/* TODO: refactor this solid */}
            {isLoginPage && (
              <>
                <span className="mr-0 hidden text-xs text-black sm:visible sm:mr-2">
                  Don't have an account?
                </span>
                <Link
                  className="p-2 underline decoration-1 underline-offset-2 hover:no-underline hover:decoration-0"
                  to={Routes.Signup}
                >
                  Sign up
                </Link>
              </>
            )}
            {/* TODO: refactor this solid */}
            {logged && (
              <Link
                className="p-1 underline decoration-1 underline-offset-2 hover:no-underline hover:decoration-0"
                to={Routes.Logout}
              >
                Logout
              </Link>
            )}
          </p>
        </div>
      </header>
      <main className="flex h-screen overflow-auto bg-stone-100">
        <Outlet />
      </main>
    </>
  );
};
