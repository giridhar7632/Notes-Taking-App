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

const EditNote = ({ children, noteId }) => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
    id: '',
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

  const getNote = async () => {
    onOpen()
    const token = localStorage.getItem('tokenStore')
    if (noteId) {
      const res = await axios.get(`/api/notes/${noteId}`, {
        headers: { Authorization: token },
      })
      console.log(res.data.date)
      setNote({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date).toLocaleDateString(),
        id: res.data._id,
      })
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setNote({ ...note, [name]: value })
  }

  const editNote = async e => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const { title, content, date, id } = note
        const newNote = { title, content, date }

        const res = await axios.put(`/api/notes/${id}`, newNote, {
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
      <Button onClick={getNote}>{children}</Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={editNote}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  value={note.title}
                  onChange={handleChange}
                  ref={initialRef}
                  placeholder="value"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Content</FormLabel>
                <Textarea
                  name="content"
                  value={note.content}
                  onChange={handleChange}
                  placeholder="Content of the note"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Date: {note.date}</FormLabel>
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
                onClick={onClose}
                type="submit"
                colorScheme="purple"
                mr={3}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditNote
