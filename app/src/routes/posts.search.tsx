import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { queryClient } from '../query/query';
import { searchPosts } from '../query/posts';
import { ISearchPost } from '../query/models';
import { SearchImageGrid } from '../components/imageGrid';

export const Route = createFileRoute('/posts/search')({
  component: SearchPostsPage,
});

function SearchPostsPage() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<ISearchPost[]>([]);

  const searchForQuery = async () => {
    const res = await queryClient.fetchQuery(searchPosts(query));
    console.log(res);
    setPosts(res || []);
  };

  return (
    <div className='w-full overflow-auto'>
      <div className='bg-zinc-950 text-center justify-center text-white px-[40px] py-[150px]'>
        <h1 className='text-3xl font-heading'>Search for posts on Mosaicify</h1>
        <div className='h-[5px]'></div>
        <h1 className='text-lg text-zinc-300'>A platform built for storytelling through photos</h1>
        <div className='h-[18px]'></div>
        <div className="mb-4">
          <input
            type="text"
            name="caption"
            placeholder="Beautiful cityscapes..."
            className="w-full md:w-[50%] text-black mt-2 p-2 border border-gray-300 rounded-md hover:border-yellow-500 transition duration-200 ease-in"
            value={query}
            onChange={e => {
              e.preventDefault();
              setQuery(e.target.value);
            }}
          />
        </div>
        <div className='h-[5px]'></div>
        <button
          onClick={searchForQuery}
          className="py-2 px-4 bg-zinc-100 text-zinc-900 font-semibold rounded-md hover:bg-yellow-500 transition duration-300"
        >
          Search
        </button>
      </div>

      <div className='py-[30px]'>
        <SearchImageGrid posts={posts} />
      </div>
    </div>
  );
}