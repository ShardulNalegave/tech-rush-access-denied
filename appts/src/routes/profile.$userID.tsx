import { useState } from 'react';
import { createFileRoute, getRouteApi, useRouter } from '@tanstack/react-router';
import { backendURL, queryClient } from '../query/query';
import { doesFollowUser, followUser, getLoggedInUser, getUser, getUserLikedPosts, getUserPosts, unfollowUser } from '../query/users';
import { useQuery } from '@tanstack/react-query';
import ImageGrid from '../components/imageGrid';
import NotFound from '../components/notFound';

enum Tabs {
  Posts,
  LikedPosts,
}

const routeAPI = getRouteApi('/profile/$userID');
export const Route = createFileRoute('/profile/$userID')({
  component: UserProfilePage,
  loader: async () => await queryClient.fetchQuery(getLoggedInUser()),
});

function UserProfilePage() {
  const router = useRouter();
  const [tab, setTab] = useState(Tabs.Posts);

  const user = routeAPI.useLoaderData();
  const { userID } = routeAPI.useParams();
  const { isPending, data, refetch: refetchUser } = useQuery(getUser(userID));
  const { isPending: isPendingDoesFollow, data: doesFollow, refetch: refetchDoesFollow } = useQuery(doesFollowUser(userID));

  const refetchData = async () => {
    await refetchUser();
    await refetchDoesFollow();
  };

  const handleFollow = async () => {
    await queryClient.fetchQuery(followUser(userID));
    await refetchData();
    router.invalidate();
  };

  const handleUnfollow = async () => {
    await queryClient.fetchQuery(unfollowUser(userID));
    await refetchData();
    router.invalidate();
  };

  if (isPending) return <></>;
  if (!data) return <NotFound />;

  return (
    <div className='flex flex-col items-center pt-[50px]'>
      <img
        className="rounded-full w-40 h-40 mb-4"
        src={`${backendURL}/storage/profile_pics/${data.id}`}
        alt="Profile"
      />
      <h1 className="text-3xl font-semibold">{data.name}</h1>
      <p className="text-gray-500">{data.email}</p>
      <div className='h-[8px]'></div>
      <p className="text-gray-500">{data.follower_count} followers | {data?.following_count} following</p>
      <div className='h-[8px]'></div>
      <p className="text-gray-800">
        {data.bio}
      </p>

      <div className="mt-4 flex space-x-4">
        <button className="mx-0 my-0 px-4 py-2 cursor-pointer border-none bg-gray-800 rounded-lg text-white font-light text-lg font-inherit overflow-hidden "
          onClick={() => router.navigate({ to: `/portfolio/${data.id}` })}
        >
          Portfolio
        </button>
        {
          user?.id === data?.id ?
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition duration-200" onClick={
              () => router.navigate({ to: '/profile/edit' })
            }>
              Edit profile
            </button>
            : !isPendingDoesFollow && doesFollow ?
            <button onClick={handleUnfollow} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition duration-200">
              Unfollow
            </button>
            : !isPendingDoesFollow && !doesFollow ?
            <button onClick={handleFollow} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition duration-200">
              Follow
            </button>
            : <></>
        }
      </div>

      <div className="mt-6 flex space-x-8 border-b border-gray-300">
        <button className={`pb-2 border-b-2 ${tab === Tabs.Posts ? 'border-black' : 'border-transparent hover:border-black'} transition duration-200 ease-in`} onClick={() => setTab(Tabs.Posts)}>
          Posts
        </button>
        <button className={`pb-2 border-b-2 ${tab === Tabs.LikedPosts ? 'border-black' : 'border-transparent hover:border-black'} transition duration-200 ease-in`} onClick={() => setTab(Tabs.LikedPosts)}>
          Liked
        </button>
      </div>

      <div className='h-[15px]'></div>

      { tab === Tabs.Posts ? <UserPosts uid={data.id} /> : <UserLikedPosts uid={data.id} /> }

      <div className='h-[50px]'></div>
    </div>
  );
}

function UserPosts({ uid } : { uid: number }) {
  const { isPending, data } = useQuery(getUserPosts(uid.toString()))

  if (isPending) return <></>;
  return <ImageGrid posts={data || []} emptyMsg={{
    title: 'No Posts!',
    desc: 'Post some pictures and they will show up here'
  }} />;
}

function UserLikedPosts({ uid } : { uid: number }) {
  const { isPending, data } = useQuery(getUserLikedPosts(uid.toString()))

  if (isPending) return <></>;
  return <ImageGrid posts={data || []} emptyMsg={{
    title: 'No Liked Posts!',
    desc: 'Like some posts and they will show up here'
  }} />;
}