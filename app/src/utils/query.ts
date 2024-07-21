
import { QueryClient, queryOptions } from '@tanstack/react-query';
import { IUser } from './models';

export const queryClient = new QueryClient();

export const login = (email: string, password: string) => {
  return queryOptions({
    queryKey: ['login', email],
    gcTime: 0,
    queryFn: async (): Promise<boolean> => {
      try {
        const res = await fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        })

        return res.status == 200;
      } catch (e) {
        return false;
      }
    },
  });
};

export const getLoggedInUser = queryOptions({
  queryKey: ['getLoggedInUser'],
  queryFn: async (): Promise<IUser | null> => {
    return null;
    // try {
    //   const res = await fetch(`http://localhost:5000/users/current`, { credentials: 'include' });
    //   if (res.status != 200) {
    //     return null;
    //   }
  
    //   const user = await res.json();
    //   console.log(user);
    //   return user;
    // } catch (e) {
    //   return null;
    // }
  },
});

export const getUser = (id: string) => queryOptions({
  queryKey: ['getUser', id],
  queryFn: async (): Promise<IUser | null> => {
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, { credentials: 'include' });
      if (res.status != 200) {
        return null;
      }
  
      return await res.json();
    } catch (e) {
      return null;
    }
  },
});