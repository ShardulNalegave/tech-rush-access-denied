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