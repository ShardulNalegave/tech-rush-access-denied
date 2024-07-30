
import { Link } from '@tanstack/react-router';
import { IPost, ISearchPost } from '../query/models';
import { backendURL } from '../query/query';

export default function ImageGrid({ posts, emptyMsg } : { posts: IPost[], emptyMsg: EmptyGridProps }) {
  return (
    <div className="mt-5 mx-8">
      {posts.length > 0 ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => (
            <Link key={post.id} to={`/posts/${post.id}`}>
              <div
                className="relative overflow-hidden rounded-lg shadow-md hover:scale-95 hover:shadow-xl transition duration-100"
              >
                <img
                  loading="lazy"
                  src={`${backendURL}/storage/posts/${post.id}`}
                  alt={post.caption}
                  className={`w-full object-cover h-[200px] md:h-[300px] lg:h-[500px]`}
                />

                <div className='absolute bottom-0 left-0 inline-block m-[10px] p-[10px] rounded-lg bg-white border-solid border-[1px] border-zinc-950'>
                  <svg
                    className="cursor-pointer lucide lucide-heart inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill='red'
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <span className="ml-[15px] inline-block">{ post.likes } { post.likes === 1 ? 'Like' : 'Likes' }</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        : <EmptyGrid {...emptyMsg} />
      }
    </div>
  );
}

export function SearchImageGrid({ posts } : { posts: ISearchPost[] }) {
  return (
    <div className="mt-5 mx-8">
      {posts.length > 0 ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => (
            <Link key={post.id} to={`/posts/${post.id}`}>
              <div
                className="relative overflow-hidden rounded-lg shadow-md hover:scale-95 hover:shadow-xl transition duration-100"
              >
                <img
                  loading="lazy"
                  src={`${backendURL}/storage/posts/${post.id}`}
                  alt={post.caption}
                  className={`w-full object-cover h-[200px] md:h-[300px] lg:h-[500px]`}
                />
              </div>
            </Link>
          ))}
        </div>
        : <></>
      }
    </div>
  );
}

export interface EmptyGridProps {
  title: string,
  desc: string,
}

function EmptyGrid(props: EmptyGridProps) {
  return (
    <div className='h-full w-full flex items-center'>
      <div className="grow h-full"></div>
      <div className='flex-none p-[50px] text-center'>
        <i className="fas fa-solid fa-images text-8xl text-yellow-700" />
        <div className='h-[30px]'></div>
        <h1 className='text-4xl font-heading'>{ props.title }</h1>
        <div className='h-[10px]'></div>
        <h1 className='font-mono'>{ props.desc }</h1>
      </div>
      <div className="grow h-full"></div>
    </div>
  );
}