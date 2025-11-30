import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/hello')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/settings/hello"!</div>
}
