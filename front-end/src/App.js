import React from 'react'
import { ChakraProvider, Flex, theme } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex p={8} h="100vh" minW="100vw" flexDirection="column">
        <Flex justifyContent="flex-end">
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
        <Flex maxW="100%" justifyContent="center" mt={8}>
          <Login />
          <Register />
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}

export default App
