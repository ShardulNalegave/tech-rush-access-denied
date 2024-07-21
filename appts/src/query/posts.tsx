import { queryOptions } from '@tanstack/react-query';
import { IPost } from './models';
import { backendURL } from './query';

export const getFeedPosts = () => queryOptions({
  queryKey: ['getFeedPosts'],
  queryFn: async (): Promise<IPost[] | null> => {
    try {
      const res = await fetch(`${backendURL}/posts/current/feed`, { credentials: 'include' })
      if (res.status != 200) return null;
      return await res.json();
    } catch (_) {
      return null;
    }
  },
});

export const getPost = (id: string) => queryOptions({
  queryKey: ['getPost'],
  queryFn: async (): Promise<IPost | null> => {
    try {
      const res = await fetch(`${backendURL}/posts/${id}`, { credentials: 'include' })
      if (res.status != 200) return null;
      return await res.json();
    } catch (_) {
      return null;
    }
  },
});

export const createPost = (payload: {
  data: string,
  caption: string,
}) => queryOptions({
  queryKey: ['createPost'],
  queryFn: async (): Promise<IPost | null> => {
    try {
      const res = await fetch(`${backendURL}/posts`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(payload),
      })
      if (res.status != 200) return null;
      return await res.json();
    } catch (_) {
      return null;
    }
  }
});