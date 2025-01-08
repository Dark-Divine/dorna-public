'use client'

import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextUIProvider } from '@nextui-org/react'

const client = new QueryClient({
    // defaultOptions: {
    //   queries: { staleTime: 2000, refetchOnWindowFocus: false },
    // },
})
export function ReactQueryProvider({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={client}>
            <NextUIProvider>{children}</NextUIProvider>
        </QueryClientProvider>
    )
}
