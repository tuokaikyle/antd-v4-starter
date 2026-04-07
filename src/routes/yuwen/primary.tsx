import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/yuwen/primary')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/yuwen/primary"!</div>
}
