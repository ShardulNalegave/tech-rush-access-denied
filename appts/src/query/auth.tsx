import { queryOptions } from '@tanstack/react-query';
import { backendURL } from './query';

export const login = (email: string, password: string) => queryOptions({
  queryKey: ['login', email],
  gcTime: 0,
  queryFn: async () => {
    const res = await fetch(`${backendURL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    return res.status == 200;
  },
});

export const logout = () => queryOptions({
  queryKey: ['logout'],
  gcTime: 0,
  queryFn: async () => {
    const res = await fetch(`${backendURL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    return res.status == 200;
  },
});