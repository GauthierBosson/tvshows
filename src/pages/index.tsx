import Head from 'next/head'
import Link from 'next/link'
import { Grid, Text, Box } from '@chakra-ui/react'

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </header>
      <main>
        <Grid gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
          <Box border="1px solid black">
            <Text>test box</Text>
          </Box>
        </Grid>
      </main>
      <footer></footer>
    </>
  )
}

// export const getServerSideProps = async () => {
//   return {
//     props: {

//     }
//   }
// }

export default Home
