import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Routes } from '../../routes';

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // authStore.clear();

    navigate(Routes.Main, { replace: true });
  }, []);

  return null;
};
