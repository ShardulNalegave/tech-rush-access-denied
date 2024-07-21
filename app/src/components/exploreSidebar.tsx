import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getLoggedInUser } from "../query/users";

export default function ExploreSidebar() {
  const { isPending, data } = useQuery(getLoggedInUser());

  if (isPending) return <></>;
  if (!data) return <></>;

  return (
    <div className='h-full w-[250px] border-solid border-r-[2px] border-zinc-950 border-opacity-50 p-[10px] hidden md:block'>
      <Link to='/feed'>
        <div className='border-solid border-[1px] border-zinc-950 border-opacity-30 rounded bg-white p-[15px] mb-[10px] hover:bg-zinc-800 hover:text-white duration-100'>
          Feed
        </div>
      </Link>
      <Link to='/posts'>
        <div className='border-solid border-[1px] border-zinc-950 border-opacity-30 rounded bg-white p-[15px] mb-[10px] hover:bg-zinc-800 hover:text-white duration-100'>
          All Posts
        </div>
      </Link>
      <Link to='/profile'>
        <div className='border-solid border-[1px] border-zinc-950 border-opacity-30 rounded bg-white p-[15px] hover:bg-zinc-800 hover:text-white duration-100'>
          Users
        </div>
      </Link>
      <div className="h-[15px]"></div>
      <hr />
      <div className="h-[15px]"></div>
      <Link to={`/profile/${data.id}`}>
        <div className='border-solid border-[1px] border-zinc-950 border-opacity-30 rounded bg-white p-[15px] hover:bg-zinc-800 hover:text-white duration-100'>
          My Profile
        </div>
      </Link>
    </div>
  );
}