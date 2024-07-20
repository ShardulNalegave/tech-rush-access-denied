import { createFileRoute, useLoaderData } from '@tanstack/react-router';

export const Route = createFileRoute('/profile/$userID')({
  component: UserProfilePage,
  loader: ({ params }) => params,
});

function UserProfilePage() {
  const params = useLoaderData({ from: '/profile/$userID' });
  return <div>Hello /profile/{params.userID}!</div>;
}