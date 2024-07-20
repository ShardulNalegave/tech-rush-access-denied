import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '../query/query';
import { getLoggedInUser } from '../query/users';
import Navbar from '../components/navbar';

export const Route = createRootRoute({
  component: RootLayout,
  loader: () => queryClient.ensureQueryData(getLoggedInUser()),
});

function RootLayout() {
  return (
    <>
      <Navbar />
      <div className='bg-zinc-50 h-[100vh] w-[100vw] overflow-x-hidden overflow-y-auto pt-[120px]'>
        <Outlet />
      </div>
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  );
}