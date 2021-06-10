import React from 'react'
import { Flex, Button, Text } from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa'
import { ColorModeSwitcher } from '../../ColorModeSwitcher'
import CreateNote from './CreateNote'

const Header = ({ setIsLogin }) => {
  const logOut = () => {
    localStorage.clear()
    setIsLogin(false)
  }

  return (
    <Flex
      justifyContent="space-between"
      w="100%"
      flexDirection={['column', 'row']}
    >
      <Flex justifyContent="center" alignItems="center" mb={4}>
        <FaEdit size="24px" />
        <Text ml={4} textAlign="center" fontWeight="bold" fontSize="2xl">
          Notes App
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <CreateNote>+ Add Note</CreateNote>
        <Button onClick={logOut} mr={2} variant="solid" size="md">
          Logout
        </Button>
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  )
}

export default Header
