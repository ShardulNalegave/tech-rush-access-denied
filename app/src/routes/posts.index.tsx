import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { getPosts } from '../query/posts';
import ImageGrid from '../components/imageGrid';
import ExploreSidebar from '../components/exploreSidebar';

export const Route = createFileRoute('/posts/')({
  component: PostsPage,
})

function PostsPage() {
  const { isPending, data: posts } = useQuery(getPosts());

  if (isPending) return <></>;
  if (posts === null || posts === undefined) return <></>;
  return (
    <div className='flex h-full w-full'>
      <div className='flex-none h-full'>
        <ExploreSidebar />
      </div>
      <div className='grow h-full'>
        <ImageGrid posts={posts} emptyMsg={{ title: 'No posts', desc: '' }} />
      </div>
    </div>
  );
}