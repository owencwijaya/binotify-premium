import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import { FaRegTrashAlt } from "react-icons/fa"
import axios from "axios";


const DeleteModal = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();


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
        if(response.status !== 200){
            alert(response.data.message)
        }
        window.location.href = '/song'
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