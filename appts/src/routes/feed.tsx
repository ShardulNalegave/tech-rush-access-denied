import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { AuthRequired } from '../components/auth';
import { getFeedPosts } from '../query/posts';
import ImageGrid from '../components/imageGrid';

export const Route = createFileRoute('/feed')({
  component: () => <AuthRequired><FeedPage /></AuthRequired>,
});

function FeedPage() {
  const { isPending, data } = useQuery(getFeedPosts());

  if (isPending) return <></>;
  return <ImageGrid posts={data || []} />;
}