import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/signup')({
  component: AuthSignUpPage,
})

function AuthSignUpPage() {
  return <div>Hello /auth/signup!</div>;
}