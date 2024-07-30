import { useState } from "react";
import moment from "moment";
import { createFileRoute, getRouteApi, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { backendURL, queryClient } from "../query/query";
import { addPostComment, deletePost, doesUserLikePost, getPost, getPostComments, likePost, unlikePost } from "../query/posts";
import { getLoggedInUser, getUser } from "../query/users";
import { deleteComment } from "../query/comments";

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
  const [imageConf, setImageConf] = useState<'cover' | 'contain'>('cover');
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
    if (!user) {
      alert('Please login to comment!');
      return;
    }
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
        <div className="relative w-full h-1/2 lg:w-1/2 lg:h-full bg-zinc-400 bg-opacity-30 rounded-lg">
          <div className="absolute top-0 right-0">
            <div className="m-[8px] p-[8px] bg-zinc-950 rounded-md cursor-pointer" onClick={() => {
              if (imageConf === 'cover') {
                setImageConf('contain');
              } else {
                setImageConf('cover');
              }
            }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill='white'
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {imageConf === 'cover' ?
                  <path d="M456 224l-144 0c-13.3 0-24-10.7-24-24l0-144c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l40 40L442.3 5.7C446 2 450.9 0 456 0s10 2 13.7 5.7l36.7 36.7C510 46 512 50.9 512 56s-2 10-5.7 13.7L433 143l40 40c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8zm0 64c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-40 40 73.4 73.4c3.6 3.6 5.7 8.5 5.7 13.7s-2 10-5.7 13.7l-36.7 36.7C466 510 461.1 512 456 512s-10-2-13.7-5.7L369 433l-40 40c-6.9 6.9-17.2 8.9-26.2 5.2s-14.8-12.5-14.8-22.2l0-144c0-13.3 10.7-24 24-24l144 0zm-256 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-40-40L69.7 506.3C66 510 61.1 512 56 512s-10-2-13.7-5.7L5.7 469.7C2 466 0 461.1 0 456s2-10 5.7-13.7L79 369 39 329c-6.9-6.9-8.9-17.2-5.2-26.2s12.5-14.8 22.2-14.8l144 0zM56 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l40-40L5.7 69.7C2 66 0 61.1 0 56s2-10 5.7-13.7L42.3 5.7C46 2 50.9 0 56 0s10 2 13.7 5.7L143 79l40-40c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 144c0 13.3-10.7 24-24 24L56 224z"/>
                  :
                  <path d="M200 32L56 32C42.7 32 32 42.7 32 56l0 144c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l40-40 79 79-79 79L73 295c-6.9-6.9-17.2-8.9-26.2-5.2S32 302.3 32 312l0 144c0 13.3 10.7 24 24 24l144 0c9.7 0 18.5-5.8 22.2-14.8s1.7-19.3-5.2-26.2l-40-40 79-79 79 79-40 40c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l144 0c13.3 0 24-10.7 24-24l0-144c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2l-40 40-79-79 79-79 40 40c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2l0-144c0-13.3-10.7-24-24-24L312 32c-9.7 0-18.5 5.8-22.2 14.8s-1.7 19.3 5.2 26.2l40 40-79 79-79-79 40-40c6.9-6.9 8.9-17.2 5.2-26.2S209.7 32 200 32z"/>
                }
              </svg>
            </div>
          </div>

          <img
            src={`${backendURL}/storage/posts/${post.id}`}
            className={`object-${imageConf} rounded-lg w-full h-full`}
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
        </div>
      </div>
    </div>
  );
}
