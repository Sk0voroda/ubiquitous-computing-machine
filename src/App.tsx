import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LoginView } from './views/LoginView';
import { MainView } from './views/MainView';
import { RootLayout } from './views/common/RootLayout';

import { Routes } from './routes';

// TODO: add text color main secondary base etc
const router = createBrowserRouter([
  {
    path: Routes.Root,
    element: <RootLayout />,
    children: [
      {
        path: Routes.Login,
        element: <LoginView />,
      },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
