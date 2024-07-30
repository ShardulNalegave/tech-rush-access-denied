import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { AuthRequired } from '../components/auth';
import { getFeedPosts } from '../query/posts';
import ImageGrid from '../components/imageGrid';
import ExploreSidebar from '../components/exploreSidebar';

export const Route = createFileRoute('/feed')({
  component: () => <AuthRequired><FeedPage /></AuthRequired>,
});

function FeedPage() {
  const { isPending, data } = useQuery(getFeedPosts());

  if (isPending) return <></>;
  return (
    <div className='flex h-full w-full'>
      <div className='flex-none h-full'>
        <ExploreSidebar />
      </div>
      <div className='grow h-full overflow-y-auto'>
        <ImageGrid posts={data || []} emptyMsg={{
          title: 'Empty Feed!',
          desc: 'Follow more people and their posts will show up here'
        }} />
      </div>
    </div>
  );
}