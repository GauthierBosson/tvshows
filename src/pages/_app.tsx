import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import { ChakraProvider } from '@chakra-ui/react'

import Navbar from '../components/Navbar'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider resetCSS>
            <Navbar />
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
