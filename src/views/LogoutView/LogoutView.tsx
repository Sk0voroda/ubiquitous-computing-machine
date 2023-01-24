import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { authStore } from '../../services';
import { Routes } from '../../routes';

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authStore.clear();

    navigate(Routes.Root, { replace: true });
  }, []);

  return null;
};
