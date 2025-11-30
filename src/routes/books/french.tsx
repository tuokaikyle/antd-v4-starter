import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/books/french')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/books/french"!</div>
}
