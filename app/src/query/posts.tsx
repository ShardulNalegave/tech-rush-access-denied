import { queryOptions } from '@tanstack/react-query';
import { IComment, IPost, ISearchPost } from './models';
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

export const getPosts = () => queryOptions({
  queryKey: ['getPosts'],
  queryFn: async (): Promise<IPost[] | null> => {
    try {
      const res = await fetch(`${backendURL}/posts`, { credentials: 'include' })
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
  keywords: string[],
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

export const deletePost = (id: string) => queryOptions({
  queryKey: ['deletePost', id],
  queryFn: async () => {
    const res = await fetch(`${backendURL}/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    return res.status === 200;
  },
});

export const doesUserLikePost = (id: string) => queryOptions({
  queryKey: ['doesUserLikePost', id],
  queryFn: async () => {
    const res = await fetch(`${backendURL}/posts/${id}/doesLike`, {
      method: 'GET',
      credentials: 'include',
    })

    if (res.status != 200) return false;
    return (await res.json()).result;
  },
});

export const likePost = (id: string) => queryOptions({
  queryKey: ['likePost', id],
  queryFn: async () => {
    const res = await fetch(`${backendURL}/posts/${id}/likes`, {
      method: 'POST',
      credentials: 'include',
    })
    return res.status === 200;
  },
});

export const unlikePost = (id: string) => queryOptions({
  queryKey: ['unlikePost', id],
  queryFn: async () => {
    const res = await fetch(`${backendURL}/posts/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
    })
    return res.status === 200;
  },
});

export const getPostComments = (id: string) => queryOptions({
  queryKey: ['getPostComments', id],
  queryFn: async (): Promise<IComment[] | null> => {
    try {
      const res = await fetch(`${backendURL}/posts/${id}/comments`, {
        credentials: 'include',
        method: 'GET',
      })
      if (res.status != 200) return null;
      return await res.json();
    } catch (_) {
      return null;
    }
  },
});

export const addPostComment = (id: string, content: string) => queryOptions({
  queryKey: ['addPostComment', id],
  queryFn: async () => {
    const res = await fetch(`${backendURL}/posts/${id}/comments`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ content }),
    });
    return res.status === 200;
  },
});

export const searchPosts = (query: string) => queryOptions({
  queryKey: ['searchPosts'],
  gcTime: 0,
  queryFn: async (): Promise<ISearchPost[] | null> => {
    try {
      const res = await fetch(`${backendURL}/posts/search`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ query }),
      });
  
      if (res.status != 200) return null;
      return await res.json();
    } catch (_) {
      return null;
    }
  },
});