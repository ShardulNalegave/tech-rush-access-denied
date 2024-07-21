import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$userID')({
  component: UserProfile,
})

function UserProfile() {
  const params = useParams();

  return <div>Hello /profile/1!</div>;
}