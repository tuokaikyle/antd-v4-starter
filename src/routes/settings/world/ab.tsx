import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/world/ab')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/settings/world/ab"!</div>
}
