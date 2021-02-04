import Link from 'next/link'
import { signOut } from 'next-auth/client'
import { Button, Flex, Box } from '@chakra-ui/react'
import { useSession } from 'next-auth/client'

const Navbar = (): JSX.Element => {
  const [session, loading] = useSession()
  return (
    <Flex as="header" h="70px" align="center" w="100%">
      <Flex as="nav" justify="space-between" w="100%" px={[2, 2, 12, 16, 16]}>
        <Box as="span">TV Shows</Box>
        <Flex align="center">
          {loading ? null : (
            <>
              {session ? (
                <>
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => signOut()}>
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </>
              )}
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Navbar
