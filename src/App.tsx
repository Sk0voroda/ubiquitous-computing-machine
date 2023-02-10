import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { RootLayout } from './views/common/RootLayout';
import { LoginSkeleton } from '@views/common/skeletons';

import { Routes } from './routes';

const LoginView = lazy(() => import('@views/LoginView'));
const MainView = lazy(() => import('@views/MainView'));
const LogoutView = lazy(() => import('@views/LogoutView'));
const SignUpView = lazy(() => import('@views/SignUpView'));

// TODO: add text color main secondary base etc
// TODO: add pre comit hooks
const router = createBrowserRouter([
  {
    path: Routes.Main,
    element: <RootLayout />,
    children: [
      {
        path: Routes.Main,
        element: (
          <Suspense fallback={'loading'}>
            <MainView />
          </Suspense>
        ),
      },
      {
        path: Routes.Login,
        element: (
          <Suspense fallback={<LoginSkeleton />}>
            <LoginView />
          </Suspense>
        ),
      },
      {
        path: Routes.Signup,
        element: (
          <Suspense fallback={<LoginSkeleton />}>
            <SignUpView />
          </Suspense>
        ),
      },
      {
        path: Routes.Logout,
        element: (
          <Suspense fallback="...loading">
            <LogoutView />
          </Suspense>
        ),
      },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
