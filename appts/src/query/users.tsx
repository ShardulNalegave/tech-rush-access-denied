import { queryOptions } from '@tanstack/react-query';
import { backendURL } from './query';
import { IPost, IUser } from './models';

export const getLoggedInUser = () => queryOptions({
  gcTime: 0,
  queryKey: ['getLoggedInUser'],
  queryFn: async (): Promise<IUser | null> => {
    try {
      const res = await fetch(`${backendURL}/users/current`, { credentials: 'include' })
      if (res.status != 200) return null;
      return await res.json();
    } catch (_) {
      return null;
    }
  },
});

export const getUser = (id: string) => queryOptions({
  queryKey: ['getUser'],
  queryFn: async (): Promise<IUser | null> => {
    try {
      const res = await fetch(`${backendURL}/users/${id}`, { credentials: 'include' })
      if (res.status != 200) return null;
      return await res.json();
    } catch (_) {
      return null;
    }
  },
});

export const getUserPosts = (id: string) => queryOptions({
  queryKey: ['getUserPosts'],
  queryFn: async (): Promise<IPost[] | null> => {
    try {
      const res = await fetch(`${backendURL}/users/${id}/posts`, { credentials: 'include' })
      if (res.status != 200) return null;
      return await res.json();
    } catch (_) {
      return null;
    }
  },
});

export const getUserLikedPosts = (id: string) => queryOptions({
  queryKey: ['getUserLikedPosts'],
  queryFn: async (): Promise<IPost[] | null> => {
    try {
      const res = await fetch(`${backendURL}/users/${id}/likedPosts`, { credentials: 'include' })
      if (res.status != 200) return null;
      return await res.json();
    } catch (_) {
      return null;
    }
  },
});