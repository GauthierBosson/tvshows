import Head from 'next/head'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { getSession } from 'next-auth/client'
import axios from 'axios'

import Searchbar from '../components/Searchbar'
import { GetServerSideProps } from 'next'
import Watchlist from '../components/watchlist/Watchlist'

const Home: React.FC<{ userId: string }> = ({ userId }) => {
  return (
    <>
      <Head>
        <title>TV shows</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Searchbar />
        <Watchlist userId={userId} />
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
