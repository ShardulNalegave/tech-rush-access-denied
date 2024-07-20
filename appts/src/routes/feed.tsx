import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/feed')({
  component: FeedPage,
});

function FeedPage() {
  return <div>Hello /feed!</div>;
}