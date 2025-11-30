import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/world/cd')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/settings/world/cd"!</div>
}
