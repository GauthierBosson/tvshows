import Link from 'next/link'
import { signOut } from 'next-auth/client'
import { Button } from '@chakra-ui/react'

const Navbar = (): JSX.Element => (
  <header>
    <Link href="/login">
      <a>Login</a>
    </Link>
    <Button variant="ghost" size="xs" onClick={() => signOut()}>
      Sign out
    </Button>
  </header>
)

export default Navbar
