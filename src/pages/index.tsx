import Head from 'next/head'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { getSession } from 'next-auth/client'
import axios from 'axios'
import { Grid, Text, Box } from '@chakra-ui/react'

import Searchbar from '../components/Searchbar'
import { GetServerSideProps } from 'next'

const Home: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isError, isLoading } = useQuery('watchlist', () =>
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/watchlist/user/${userId}`)
      .then((res) => res.data.data)
  )

  return (
    <>
      <Head>
        <title>TV shows</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Searchbar />
        {/**
         * WATCHLIST COMPONENT
         */}
        {isLoading ? (
          <span>Loading</span>
        ) : (
          <>
            {isError ? (
              <span>Error</span>
            ) : (
              <>
                {data.shows?.length ? (
                  <Grid
                    gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                    gap={6}
                  >
                    {data.shows.map((s, i) => (
                      <Box key={i} border="1px solid black">
                        <Text>{s.showId}</Text>
                      </Box>
                    ))}
                  </Grid>
                ) : (
                  <p>Nothing on your watchlist yet</p>
                )}
              </>
            )}
          </>
        )}
      </main>
      <footer></footer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await getSession(context)

  if (user) {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery('watchlist', () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/watchlist/user/${user.id}`)
        .then((res) => res.data.data)
    )

    return {
      props: {
        userId: user.id,
        dehydratedState: dehydrate(queryClient),
      },
    }
  }

  context.res.setHeader('Location', '/login')
  context.res.statusCode = 302
  context.res.end()

  return {
    props: {},
  }
}

export default Home
