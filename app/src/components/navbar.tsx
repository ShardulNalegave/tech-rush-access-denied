
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getLoggedInUser } from '../query/users';
import { queryClient } from '../query/query';
import { logout } from '../query/auth';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data, isPending } = useQuery(getLoggedInUser());

  const onLogout = async () => {
    const res = await queryClient.fetchQuery(logout());
    if (res) window.location.replace('/');
  };

  const authLinks = () => (
    <>
      <Link to='/feed' className="[&.active]:border-b-2 border-yellow-500 mx-[10px] font-heading text-lg">Feed</Link>
      <Link to='/posts/create' className="[&.active]:border-b-2 border-yellow-500 mx-[10px] font-heading text-lg">Create Post</Link>
      <Link to={`/profile/${data?.id}`} className="[&.active]:border-b-2 border-yellow-500 mx-[10px] font-heading text-lg">Profile</Link>
      <Link to={`/portfolio/${data?.id}`} className="[&.active]:border-b-2 border-yellow-500 mx-[10px] font-heading text-lg">Portfolio</Link>
      <div className="m-[10px] font-heading text-lg text-red-600 cursor-pointer" onClick={onLogout}>Logout</div>
    </>
  );

  const unauthLinks = (
    <>
      <Link to='/posts/search' className="[&.active]:border-b-2 border-yellow-500 mx-[10px] font-heading text-lg">Search</Link>
      <Link to='/posts' className="[&.active]:border-b-2 border-yellow-500 mx-[10px] font-heading text-lg">Posts</Link>
      <Link to='/profile' className="[&.active]:border-b-2 border-yellow-500 mx-[10px] font-heading text-lg">Users</Link>
      <Link to='/auth/login' className="[&.active]:border-b-2 border-yellow-500 mx-[10px] font-heading text-lg">Login</Link>
      <Link to='/auth/signup' className="[&.active]:border-b-2 border-yellow-500 mx-[10px] font-heading text-lg">Sign Up</Link>
    </>
  );

  const authLinksMobile = () => (
    <>
      <Link to='/feed' onClick={() => setMenuOpen(false)}>
        <div className='rounded-lg border-solid border-[1px] border-zinc-50 border-opacity-50 p-[20px] font-heading mb-[10px] cursor-pointer'>
          Feed
        </div>
      </Link>
      <Link to='/posts/create' onClick={() => setMenuOpen(false)}>
        <div className='rounded-lg border-solid border-[1px] border-zinc-50 border-opacity-50 p-[20px] font-heading mb-[10px] cursor-pointer'>
          Create Post
        </div>
      </Link>
      <Link to='/posts' onClick={() => setMenuOpen(false)}>
        <div className='rounded-lg border-solid border-[1px] border-zinc-50 border-opacity-50 p-[20px] font-heading mb-[10px] cursor-pointer'>
          All Posts
        </div>
      </Link>
      <Link to='/profile' onClick={() => setMenuOpen(false)}>
        <div className='rounded-lg border-solid border-[1px] border-zinc-50 border-opacity-50 p-[20px] font-heading mb-[10px] cursor-pointer'>
          Users
        </div>
      </Link>
      <Link to={`/profile/${data?.id}`} onClick={() => setMenuOpen(false)}>
        <div className='rounded-lg border-solid border-[1px] border-zinc-50 border-opacity-50 p-[20px] font-heading mb-[10px] cursor-pointer'>
          Profile
        </div>
      </Link>
      <Link to={`/portfolio/${data?.id}`} onClick={() => setMenuOpen(false)}>
        <div className='rounded-lg border-solid border-[1px] border-zinc-50 border-opacity-50 p-[20px] font-heading mb-[10px] cursor-pointer'>
          Portfolio
        </div>
      </Link>
      <div className='rounded-lg border-solid border-[1px] border-zinc-50 border-opacity-50 p-[20px] font-heading text-red-600 cursor-pointer' onClick={onLogout}>
        Logout
      </div>
    </>
  );

  const unauthLinksMobile = (
    <>
      <Link to='/posts/search' onClick={() => setMenuOpen(false)}>
        <div className='rounded-lg border-solid border-[1px] border-zinc-50 border-opacity-50 p-[20px] font-heading mb-[10px] cursor-pointer'>
          Search
        </div>
      </Link>
      <Link to='/posts' onClick={() => setMenuOpen(false)}>
        <div className='rounded-lg border-solid border-[1px] border-zinc-50 border-opacity-50 p-[20px] font-heading mb-[10px] cursor-pointer'>
          Posts
        </div>
      </Link>
      <Link to='/profile' onClick={() => setMenuOpen(false)}>
        <div className='rounded-lg border-solid border-[1px] border-zinc-50 border-opacity-50 p-[20px] font-heading mb-[10px] cursor-pointer'>
          Users
        </div>
      </Link>
      <Link to='/auth/login' onClick={() => setMenuOpen(false)}>
        <div className='rounded-lg border-solid border-[1px] border-zinc-50 border-opacity-50 p-[20px] font-heading mb-[10px] cursor-pointer'>
          Login
        </div>
      </Link>
      <Link to='/auth/signup' onClick={() => setMenuOpen(false)}>
        <div className='rounded-lg border-solid border-[1px] border-zinc-50 border-opacity-50 p-[20px] font-heading cursor-pointer'>
          Sign Up
        </div>
      </Link>
    </>
  );

  return (
    <div className='z-50 top-0 left-0 right-0 w-[100vw] bg-white py-[10px] px-[30px] border-b-[2px] border-solid border-b-zinc-950 border-opacity-50 flex items-center'>
      <Link to={data === null ? '/' : '/feed'} className="flex-none">
        <img
          className="h-[60px] scale-125"
          src="/src/assets/logos/png/logo-black.png"
        />
      </Link>
      <div className="grow"></div>
      <div className={`items-center hidden md:flex`}>
        { !isPending && data ? authLinks() : unauthLinks }
      </div>
      <div className='block md:hidden' onClick={() => setMenuOpen(true)}>
        <i className='fas fa-solid fa-bars'></i>
      </div>
      
      <div className={`fixed top-0 right-0 left-0 bottom-0 h-screen w-screen z-10 bg-zinc-900 text-white p-[25px] ${menuOpen ? 'block md:hidden' : 'hidden'}`}>
        <div className='flex'>
          <div className="grow"></div>
          <div className='flex-none rounded-lg border-solid border-[1px] border-zinc-50 border-opacity-50 py-[10px] px-[15px] font-mono cursor-pointer' onClick={() => setMenuOpen(false)}>
            x
          </div>
        </div>
        <div className='h-[20px]'></div>
        { !isPending && data ? authLinksMobile() : unauthLinksMobile }
      </div>
    </div>
  );
}