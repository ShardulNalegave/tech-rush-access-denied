import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile/edit')({
  component: EditProfilePage,
})

function EditProfilePage() {
  return <div>Edit profile page</div>;
}