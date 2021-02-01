import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'
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
        <ChakraProvider resetCSS>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
