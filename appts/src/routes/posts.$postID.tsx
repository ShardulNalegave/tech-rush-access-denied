import { createFileRoute, getRouteApi, Link, useRouter } from "@tanstack/react-router";
import { backendURL, queryClient } from "../query/query";
import { addPostComment, deletePost, doesUserLikePost, getPost, getPostComments, likePost, unlikePost } from "../query/posts";
import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser, getUser } from "../query/users";
import moment from "moment";
import { deleteComment } from "../query/comments";
import { useState } from "react";

const routeAPI = getRouteApi("/posts/$postID");
export const Route = createFileRoute("/posts/$postID")({
  component: GetPost,
  loader: ({ params }) => queryClient.fetchQuery(getPost(params.postID)),
});

function GetPost() {
  const [comment, setComment] = useState('');

  const router = useRouter();
  const params = routeAPI.useParams();
  const post = routeAPI.useLoaderData();
  const { isPending: isUserPending, data: user } = useQuery(getLoggedInUser());
  const { data: doesLike, refetch: refetchDoesLike } = useQuery({
    enabled: !isUserPending && user != null && user != undefined,
    ...doesUserLikePost(params.postID),
  });

  const { data: postedBy } = useQuery({
    enabled: !!post,
    ...getUser(post?.posted_by.toString() || '-1'),
  });

  const { data: comments, refetch: refetchComments } = useQuery({
    enabled: !!post,
    ...getPostComments(post?.id.toString() || '-1'),
  });

  const handleLike = async () => {
    if (doesLike) {
      await queryClient.fetchQuery(unlikePost(params.postID));
    } else {
      await queryClient.fetchQuery(likePost(params.postID));
    }
    refetchDoesLike();
    router.invalidate();
  };

  const handleDeleteComment = async (id: string) => {
    await queryClient.fetchQuery(deleteComment(id));
    refetchComments();
  };

  const handleNewComment = async () => {
    await queryClient.fetchQuery(addPostComment(params.postID, comment));
    setComment('');
    refetchComments();
  };

  const handleDelete = async () => {
    const res = await queryClient.fetchQuery(deletePost(params.postID));
    if (!res) {
      alert('Couldn\'t delete post');
    } else {
      router.history.back();
    }
  };

  if (!post || !postedBy) return <></>;
  return (
    <div className="w-full h-full">
      <div className="w-full h-full p-5 flex flex-col lg:flex-row gap-3">
        <div className="w-full h-1/2 lg:w-1/2 lg:h-full   ">
          <img
            src={`${backendURL}/storage/posts/${post.id}`}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <div className="w-full lg:w-1/2 lg:h-full h-1/2 flex flex-col  gap-1 ">
          <div className="flex flex-col w-full lg:gap-1  p-1">
            <h1 className="font-body font-bold text-xl ">{post.caption}</h1>
            <div className="w-full SFR text-md flex lg:flex-col justify-between gap-4 ">
              <Link to={`/profile/${postedBy.id}`} className="underline decoration-yellow-800 underline-offset-2 decoration-2">{postedBy.name}</Link>
              <div className={!user ? 'block' : 'hidden'}>{ post.likes } { post.likes === 1 ? 'Like' : 'Likes' }</div>
              <div className={user ? 'block' : 'hidden'}>
                <svg
                  className="cursor-pointer lucide lucide-heart inline-block"
                  onClick={handleLike}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={doesLike ? 'red' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="ml-[15px] inline-block">{ post.likes } { post.likes === 1 ? 'Like' : 'Likes' }</span>
              </div>

              <div>Posted on: {moment(post.created_at).local().format('Do MMMM, YYYY')}</div>
            </div>
          </div>
          <div className='h-[10px]'></div>
          <div className={user && postedBy && postedBy.id === user.id ? 'block' : 'hidden'}>
            <button className="mx-0 my-0 px-4 py-2 cursor-pointer border-none bg-red-800 rounded-lg text-white font-light text-lg font-inherit overflow-hidden"
              onClick={handleDelete}>
              Delete
            </button>
          </div>
          <div className='h-[10px]'></div>
          <div className="h-1/2 p-3 lg:h-2/3  w-full border-2 rounded-lg font-body overflow-y-auto   text-gray-400 ">
            {comments?.length === 0 ? <p>No comments, why not add one?</p> : <></>}
            {comments?.map(c => (
              <div key={c.id} className="flex items-center p-[10px] rounded-lg m-[5px] bg-white border-solid border-zinc-950 border-[1px] border-opacity-20 shadow-sm">
                <h1 className="flex-none">{c.content}</h1>
                <div className="grow"></div>
                <button className={`cursor-pointer mx-0 my-0 px-4 py-2 border-none bg-red-800 rounded-lg text-white font-light text-lg font-inherit overflow-hidden ${c.user_id === user?.id ? 'block' : 'hidden'}`}
                  onClick={() => handleDeleteComment(c.id.toString())}>
                  <i className="fas fa-solid fa-trash text-white" />
                </button>
              </div>
            ))}
          </div>
          <div className="w-full border-2 border-gray-400 h-1/6 lg:h-12 flex justify-center items-center l  rounded-xl p-3 mt-3  ">
            <input
              placeholder="Add a Comment"
              type="text"
              className="font-body w-full h-2/3  lg:h-1/6 outline-none  rounded-2xl p-4"
              value={comment}
              onChange={e => {
                e.preventDefault();
                setComment(e.target.value);
              }}
            />

            <div onClick={handleNewComment}>
              <svg
                className="cursor-pointer lucide lucide-send"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
