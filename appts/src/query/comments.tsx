import { queryOptions } from '@tanstack/react-query';
import { backendURL } from './query';

export const deleteComment = (id: string) => queryOptions({
  queryKey: ['deleteComment', id],
  queryFn: async () => {
    const res = await fetch(`${backendURL}/comments/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return res.status === 200;
  },
});