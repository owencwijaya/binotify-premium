import {
  Button, IconButton, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast
} from "@chakra-ui/react";

import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";


const DeleteModal = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()


  const deleteSong = () => {
    axios.delete(
        `http://localhost:3000/song/${props.song_id}`,
        {
            // mode: 'cors', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${sessionStorage.getItem("auth_token")}`
            },
        }
    ).then((response) => {
        toast({
          title: response.status === 200 ? "Song deleted." : "Error",
          description: response.data.message,
          status: response.status === 200 ? "success" : "error",
          duration: 2000,
          isClosable: true,
          onCloseComplete() {
            window.location.href = "/song";
          },
          position: "top",
        })
    })
  }

  return (
    <>
      <IconButton
        aria-label="Delete Song"
        icon={<FaRegTrashAlt />}
        bg="red.300"
        size="sm"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Delete Song - {props.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this song?
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
            <Button colorScheme='red' mr={3} onClick = {deleteSong}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;