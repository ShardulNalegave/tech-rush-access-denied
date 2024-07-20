import { createFileRoute } from '@tanstack/react-router';
import { UnAuthRequired } from '../components/auth';

export const Route = createFileRoute('/auth/signup')({
  component: () => <UnAuthRequired><AuthSignUpPage /></UnAuthRequired>,
})

function AuthSignUpPage() {
  return <div>Hello /auth/signup!</div>;
}