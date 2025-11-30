import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/books/spanish')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/books/spanish"!</div>
}
