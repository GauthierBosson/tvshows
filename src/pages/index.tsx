import Head from 'next/head'
import { useSession, getSession } from 'next-auth/client'
import axios from 'axios'
import { Grid, Text, Box } from '@chakra-ui/react'

import Searchbar from '../components/Searchbar'
import { WatchlistProps } from '../libs/models/Wacthlist'
import { GetServerSideProps } from 'next'

const Home: React.FC<{ watchlist: WatchlistProps }> = ({ watchlist }) => {
  const [session, loading] = useSession()

  if (loading) return <p>Loading</p>

  if (!session) return <p>Not logged in</p>

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Searchbar />
        {/**
         * WATCHLIST COMPONENT
         */}
        {watchlist.shows.length ? (
          <Grid gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
            {watchlist.shows.map((_, i) => (
              <Box key={i} border="1px solid black">
                <Text>test box</Text>
              </Box>
            ))}
          </Grid>
        ) : (
          <p>Nothing on your watchlist yet</p>
        )}
      </main>
      <footer></footer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await getSession(context)
  const watchlist = await axios
    .get(`${process.env.BASE_URL}/api/watchlist/user/${user.id}`)
    .then((res) => res.data)
  return {
    props: {
      watchlist: watchlist || [],
    },
  }
}

export default Home
