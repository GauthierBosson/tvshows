import { Formik, Form, Field } from 'formik'
import axios from 'axios'
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

import { signupSchema } from '../libs/validation'

const Signup = (): JSX.Element => {
  return (
    <Grid placeContent="center" h="100vh">
      <Box borderWidth="1px" borderRadius="lg" w="500px" p={6}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={signupSchema}
          onSubmit={async (values, actions) => {
            await axios.post('/api/user', values)
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

              <Field name="confirmPassword">
                {({ form, field }) => (
                  <FormControl
                    isInvalid={
                      form.errors.confirmPassword && form.touched.confirmPassword
                    }
                  >
                    <FormLabel htmlFor="confirmPassword">
                      Confirmation du mot de passe
                    </FormLabel>
                    <Input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      placeholder="Mot de passe"
                    />
                    <FormErrorMessage>
                      {form.errors.confirmPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <HStack>
                <Button isLoading={props.isSubmitting} type="submit">
                  Valider
                </Button>
              </HStack>
            </VStack>
          )}
        </Formik>
      </Box>
    </Grid>
  )
}

export default Signup
