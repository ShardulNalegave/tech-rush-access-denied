import { createFileRoute, Link } from '@tanstack/react-router'
import { backendURL } from '../query/query';
import { getUsers } from '../query/users';
import { useQuery } from '@tanstack/react-query';
import ExploreSidebar from '../components/exploreSidebar';

export const Route = createFileRoute('/profile/')({
  component: UserProfiles,
})

function UserProfiles() {
  const { isPending, data: users } = useQuery(getUsers());

  if (isPending) return <></>;
  if (users === null || users === undefined) return <></>;
  return (
    <div className='flex h-full w-full'>
      <div className='flex-none h-full'>
        <ExploreSidebar />
      </div>
      <div className='grow h-full'>
        <div className='w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-[25px]'>
          {users.map(user => (
            <Link to={`/profile/${user.id}`} key={user.id}>
              <div className='hover:shadow-md duration-200 rounded-lg bg-white border-solid border-zinc-950 border-[1px] border-opacity-20 shadow-sm p-[25px] py-[50px] flex flex-col items-center'>
                <img
                  className="rounded-full w-40 h-40 mb-4"
                  src={`${backendURL}/storage/profile_pics/${user.id}`}
                  alt="Profile"
                />
                <h1 className="text-3xl font-semibold">{user.name}</h1>
                <p className="text-gray-500">{user.email}</p>
                <div className='h-[8px]'></div>
                <p className="text-gray-500">{user.follower_count} followers | {user.following_count} following</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}