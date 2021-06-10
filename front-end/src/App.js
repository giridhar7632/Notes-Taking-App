import React, { useEffect, useState } from 'react'
import { ChakraProvider, Flex, theme } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'

import Login from './components/Login'
import NotesShell from './components/NotesShell'
import axios from 'axios'
import Header from './components/notes/Header'

function App() {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const verified = await axios.get('/users/verify', {
          headers: { Authorization: token },
        })
        console.log(verified)
        setIsLogin(verified.data)
        if (verified.data === false) return localStorage.clear()
      } else {
        setIsLogin(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Flex p={8} h="100vh" flexDirection="column" textAlign="center">
        {isLogin ? (
          <Header setIsLogin={setIsLogin} />
        ) : (
          <Flex justifyContent="flex-end">
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>
        )}
        <Flex maxW="100%" justifyContent="center" mt={8}>
          {isLogin ? <NotesShell /> : <Login setIsLogin={setIsLogin} />}
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}

export default App
