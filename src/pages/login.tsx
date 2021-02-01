import { useRouter } from 'next/router'
import { Formik, Field, Form } from 'formik'
import { signIn } from 'next-auth/client'
import {
  Grid,
  Box,
  Input,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'

const Login = (): JSX.Element => {
  const router = useRouter()
  return (
    <Grid placeContent="center" h="100vh">
      <Box borderWidth="1px" borderRadius="lg" w="500px" p={6}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values, actions) => {
            await signIn('credentials', values)
            actions.setSubmitting(false)
          }}
        >
          {(props) => (
            <VStack as={Form} spacing={4} align="flex-end">
              <Field name="email">
                {({ form, field }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" type="email" placeholder="Email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ form, field }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">Mot de passe</FormLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Mot de passe"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <HStack>
                <Button isLoading={props.isSubmitting} type="submit">
                  Valider
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => router.push('/signup')}
                >
                  Or signup
                </Button>
              </HStack>
            </VStack>
          )}
        </Formik>
      </Box>
    </Grid>
  )
}

export default Login
