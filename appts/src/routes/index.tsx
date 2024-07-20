import { createFileRoute } from '@tanstack/react-router';
import { UnAuthRequired } from '../components/auth';

export const Route = createFileRoute('/')({
  component: () => <UnAuthRequired><Index /></UnAuthRequired>,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}
