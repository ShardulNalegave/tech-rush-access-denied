import { createRootRoute, Link, Outlet, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
  const loc = useLocation();

  return (
    <div className='h-screen w-screen overflow-x-hidden overflow-y-hidden flex flex-col'>
      <Navbar />
      <div className='bg-zinc-50 grow overflow-y-auto'>
        <Outlet />
      </div>

      <div className='fixed bottom-0 right-0 flex flex-col p-[15px]'>
        <Link to='/posts/create' className={`bg-yellow-600 p-[20px] rounded-2xl text-center justify-center shadow-lg ${loc.pathname === '/posts/create' ? 'hidden' : 'block'}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill='black'
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
          </svg>
        </Link>
        <Link to='/posts/search' className={`mt-[8px] bg-zinc-950 p-[20px] rounded-2xl text-center justify-center shadow-lg ${loc.pathname === '/posts/search' ? 'hidden' : 'block'}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill='white'
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
          </svg>
        </Link>
      </div>

      <ReactQueryDevtools buttonPosition='bottom-left' />
      <TanStackRouterDevtools position='bottom-left' />
    </div>
  );
}