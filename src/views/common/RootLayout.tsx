import { Link, Outlet, useLocation } from 'react-router-dom';

import BrainLogo from './../../assets/images/the-brain-logo.svg?url';

import { authStore } from '../../services';
import { Routes } from '../../routes';

// TODO: change focus outline for header links
export const RootLayout = () => {
  const location = useLocation();

  const { pathname } = location;
  const isLoginPage = pathname === Routes.Login;
  const isMainPage = pathname === Routes.Main;
  const logged = authStore.isValid;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 overflow-hidden bg-white font-mono text-blue-600 shadow-md">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-1 px-3">
          <Link
            className="flex items-center p-1 font-medium lg:items-center lg:justify-center"
            to={Routes.Main}
          >
            <img src={BrainLogo} className="h-8 w-8" />
            <span className="invisible ml-0 w-0 text-xl sm:visible sm:ml-3 sm:w-auto">
              WONTDO
            </span>
          </Link>
          <p className="text-sm font-thin">
            {isMainPage && !logged && (
              <>
                <Link className="link-styled mr-2" to={Routes.Login}>
                  Sign in
                </Link>
                <Link className="link-styled" to={Routes.Signup}>
                  Sign up
                </Link>
              </>
            )}
            {isLoginPage && (
              <>
                <span className="invisible mr-0 text-xs text-black sm:visible sm:mr-2">
                  Don't have an account?
                </span>
                <Link className="link-styled" to={Routes.Signup}>
                  Sign up
                </Link>
              </>
            )}
            {logged && (
              <Link className="link-styled" to={Routes.Logout}>
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
