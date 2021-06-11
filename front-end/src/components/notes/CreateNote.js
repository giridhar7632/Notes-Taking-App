import React, { useRef, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
  Textarea,
} from '@chakra-ui/react'
import axios from 'axios'

const CreateNote = ({ children }) => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()

  const toast = useToast()
  const toastIdRef = useRef()
  const addToast = (text, type) => {
    toastIdRef.current = toast({
      title: `${text}`,
      status: `${type}`,
      isClosable: true,
      duration: 3000,
    })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setNote({ ...note, [name]: value })
  }

  const createNote = async e => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const { title, content, date } = note
        const newNote = { title, content, date }

        const res = await axios.post('/api/notes', newNote, {
          headers: { Authorization: token },
        })
        addToast(res.data.msg, res.data.type)
        window.location.href = '/'
      }
    } catch (error) {
      window.location.href = '/'
    }
  }

  return (
    <>
      <Button mr={4} variant="solid" size="md" onClick={onOpen}>
        {children}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Note</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={createNote}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  ref={initialRef}
                  value={note.title}
                  onChange={handleChange}
                  placeholder="Untitled"
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea
                  name="content"
                  value={note.content}
                  onChange={handleChange}
                  placeholder="Content of the note"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Date</FormLabel>
                <Input
                  name="date"
                  value={note.date}
                  onChange={handleChange}
                  type="date"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                colorScheme="purple"
                mr={3}
                onClick={onClose}
              >
                Add Note
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateNote
