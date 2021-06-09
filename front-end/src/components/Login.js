import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Flex, Heading } from '@chakra-ui/layout'
import React, { useState } from 'react'

const Login = () => {
  const [value, setValue] = useState('')
  const [show, setShow] = React.useState(false)

  const handleChange = e => setValue(e.target.value)
  const handlePassword = () => setShow(!show)

  return (
    <Flex p="6" justifyContent="center">
      <form>
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Login
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={value}
            onChange={handleChange}
            placeholder="Email"
          />
        </FormControl>
        <FormControl id="password" mt="2" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handlePassword}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button mt={6} type="submit" colorScheme="teal" variant="solid">
          Login
        </Button>
      </form>
    </Flex>
  )
}

export default Login
