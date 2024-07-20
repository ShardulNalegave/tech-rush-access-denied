import { createFileRoute } from '@tanstack/react-router';
import { AuthRequired } from '../components/auth';

export const Route = createFileRoute('/profile/edit')({
  component: () => <AuthRequired><EditProfilePage /></AuthRequired>,
})

function EditProfilePage() {
  return <div>Edit profile page</div>;
}