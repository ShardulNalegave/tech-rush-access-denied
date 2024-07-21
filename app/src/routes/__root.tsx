import { createRootRoute, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '../query/query';
import { getLoggedInUser } from '../query/users';
import Navbar from '../components/navbar';
import NotFound from '../components/notFound';

export const Route = createRootRoute({
  component: RootLayout,
  loader: () => queryClient.ensureQueryData(getLoggedInUser()),
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <div className='h-screen w-screen overflow-x-hidden overflow-y-hidden flex flex-col'>
      <Navbar />
      <div className='bg-zinc-50 grow overflow-y-auto'>
        <Outlet />
      </div>
      {/* <ReactQueryDevtools /> */}
      {/* <TanStackRouterDevtools /> */}
    </div>
  );
}