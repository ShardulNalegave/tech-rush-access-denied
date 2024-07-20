import { createFileRoute, getRouteApi } from '@tanstack/react-router'
import { backendURL, queryClient } from '../query/query';
import { getPost } from '../query/posts';

const routeAPI = getRouteApi('/posts/$postID');
export const Route = createFileRoute('/posts/$postID')({
  component: GetPost,
  loader: ({ params }) => queryClient.fetchQuery(getPost(params.postID)),
});

function GetPost() {
  const post = routeAPI.useLoaderData();

  if (post === null) return <></>;
  return (
    <div className='h-full gap-0 grid grid-cols-1 lg:grid-cols-2'>
      <div className="grow p-[20px]">
        <img src={`${backendURL}/storage/posts/${post.id}`} className="w-full h-full sm:h-[80%] object-cover rounded-md"/>
      </div>
      <div className="grow p-[20px] py-[40px]">
        <p>{post.caption}</p>
        <div className='h-[10px]'></div>
        <hr />
      </div>
    </div>
  );
}