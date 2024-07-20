import { useQuery } from '@tanstack/react-query';
import { getLoggedInUser } from '../query/users';
import { ReactNode } from 'react';

export function AuthRequired({
  redirectTo = '/auth/login',
  children,
} : {
  redirectTo?: string,
  children: ReactNode,
}) {
  const { isPending, data } = useQuery(getLoggedInUser());

  if (isPending) return <></>;
  if (data != null) return children
  else window.location.replace(redirectTo);
}

export function UnAuthRequired({
  redirectTo = '/feed',
  children,
} : {
  redirectTo?: string,
  children: ReactNode,
}) {
  const { isPending, data } = useQuery(getLoggedInUser());

  if (isPending) return <></>;
  if (data === null) return children
  else window.location.replace(redirectTo);
}