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

export const getUsers = () => queryOptions({
  queryKey: ['getUsers'],
  queryFn: async (): Promise<IUser[] | null> => {
    try {
      const res = await fetch(`${backendURL}/users`, { credentials: 'include' })
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

export const updateUserProfile = (payload : {
  name: string,
  bio: string,
  about: string,
}) => queryOptions({
  queryKey: ['updateUserProfile'],
  queryFn: async () => {
    const res = await fetch(`${backendURL}/users/current`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    
    return res.status === 200;
  },
});

export const updateUserProfilePic = (payload : {
  data: string,
}) => queryOptions({
  queryKey: ['updateUserProfile'],
  queryFn: async () => {
    const res = await fetch(`${backendURL}/users/current/profilePic`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    
    return res.status === 200;
  },
});

export const followUser = (id: string) => queryOptions({
  queryKey: ['followUser', id],
  queryFn: async () => {
    const res = await fetch(`${backendURL}/users/${id}/follow`, {
      method: 'POST',
      credentials: 'include',
    })

    return res.status === 200;
  },
});

export const unfollowUser = (id: string) => queryOptions({
  queryKey: ['unfollowUser', id],
  queryFn: async () => {
    const res = await fetch(`${backendURL}/users/${id}/unfollow`, {
      method: 'POST',
      credentials: 'include',
    })

    return res.status === 200;
  },
});

export const doesFollowUser = (id: string) => queryOptions({
  queryKey: ['doesFollowUser', id],
  queryFn: async () => {
    const res = await fetch(`${backendURL}/users/${id}/doesFollow`, {
      method: 'GET',
      credentials: 'include',
    })

    if (res.status != 200) return false;
    return (await res.json()).result;
  },
});