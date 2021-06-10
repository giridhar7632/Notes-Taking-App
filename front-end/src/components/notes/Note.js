import { IconButton } from '@chakra-ui/button'
import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/layout'
//import { format } from 'timeago.js'
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import EditNote from './EditNote'

const Note = () => {
  return (
    <Box
      w="100%"
      p={5}
      shadow="md"
      borderWidth="1px"
      flex="1"
      borderRadius="md"
    >
      <Heading as="h3" size="lg" isTruncated>
        Title
      </Heading>
      <Text my={4} noOfLines={[3, 4, 5]}>
        "The quick brown fox jumps over the lazy dog" is an English-language
        pangram—a sentence that contains all of the letters of the English
        alphabet. Owing to its existence, Chakra was created.
      </Text>
      <Stack spacing={4}>
        <HStack justifyContent="space-between">
          <Text color="purple.500">Username</Text>
          <Text>26/07/2022</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <EditNote>Edit</EditNote>
          <IconButton
            colorScheme="red"
            variant="solid"
            size="md"
            icon={<FaTrashAlt />}
          ></IconButton>
        </HStack>
      </Stack>
    </Box>
  )
}

export default Note
