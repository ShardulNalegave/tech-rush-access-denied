import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: AuthLoginPage,
})

function AuthLoginPage() {
  return <div>Hello /auth/login!</div>;
}