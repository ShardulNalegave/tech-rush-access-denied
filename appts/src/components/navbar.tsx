
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getLoggedInUser } from '../query/users';
import { queryClient } from '../query/query';
import { logout } from '../query/auth';

export default function Navbar() {
  const { data, isPending } = useQuery(getLoggedInUser());

  const onLogout = async () => {
    const res = await queryClient.fetchQuery(logout());
    if (res) window.location.replace('/');
  };

  const authLinks = () => (
    <>
      <Link to='/feed' className="[&.active]:border-b-2 border-yellow-500 mx-[10px] font-heading text-lg">Feed</Link>
      <Link to={`/profile/${data?.id}`} className="[&.active]:border-b-2 border-yellow-500 mx-[10px] font-heading text-lg">Profile</Link>
      <Link to={`/portfolio/${data?.id}`} className="[&.active]:border-b-2 border-yellow-500 mx-[10px] font-heading text-lg">Portfolio</Link>
      <div className="m-[10px] font-heading text-lg text-red-600 cursor-pointer" onClick={onLogout}>Logout</div>
    </>
  );

  const unauthLinks = (
    <>
      <Link to='/auth/login' className="[&.active]:border-b-2 border-yellow-500 mx-[10px] font-heading text-lg">Login</Link>
      <Link to='/auth/signup' className="[&.active]:border-b-2 border-yellow-500 mx-[10px] font-heading text-lg">Sign Up</Link>
    </>
  );

  return (
    <div className='z-50 fixed top-0 left-0 right-0 w-[100vw] bg-white py-[10px] px-[30px] border-b-[2px] border-solid border-b-zinc-950 border-opacity-50 flex items-center'>
      <Link to="/" className="flex-none">
        <img
          className="h-[60px] scale-125"
          src="/src/assets/logos/png/logo-black.png"
        />
      </Link>
      <div className="grow"></div>
      { !isPending && data ? authLinks() : unauthLinks }
    </div>
  );
}