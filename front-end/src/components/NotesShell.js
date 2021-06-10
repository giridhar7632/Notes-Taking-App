import React from 'react'
import Home from './notes/Home'
import { Flex, Grid } from '@chakra-ui/layout'
import Note from './notes/Note'

const NotesShell = () => {
  return (
    <Flex w="100%" flexDirection="column">
      <Home />
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap={6}
        w="100%"
      >
        <Note />
        <Note />
        <Note />
        <Note />
      </Grid>
    </Flex>
  )
}

export default NotesShell
