
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import LogsComponent from './logs'
import { getLogs } from '@/services/Log.service'

export default async function Logs(){
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['log'],
    queryFn: () => getLogs({ limit: 10, currentPage: 1 }),
  })

  return (
    <HydrationBoundary
      state={dehydrate(queryClient)}
    >
      <LogsComponent />
    </HydrationBoundary>
  )
}