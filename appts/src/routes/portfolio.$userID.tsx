import { createFileRoute, useLoaderData } from '@tanstack/react-router';

export const Route = createFileRoute('/portfolio/$userID')({
  component: UserPortfolioPage,
  loader: ({ params }) => params,
});

function UserPortfolioPage() {
  const params = useLoaderData({ from: '/portfolio/$userID' });
  return <div>Hello /portfolio/{params.userID}!</div>;
}