import React, { useRef } from 'react'
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

const CreateNote = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()

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
          <form>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input ref={initialRef} placeholder="Untitled" />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea placeholder="Content of the note" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Date</FormLabel>
                <Input type="date" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="purple" mr={3}>
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
