import {
  Button, IconButton, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast
} from "@chakra-ui/react";
  
  import axios from "axios";
import { BsCheck2Circle } from "react-icons/bs";
import { MdClose } from "react-icons/md";
  
  
  const SubscriptionModal = (props: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
  
    const updateSubs = () => {
      axios.put(
          `http://localhost:3000/subs`,
          {
            creator_id: props.creator_id,
            subscriber_id: props.subscriber_id,
            new_status: props.action === "accept" ? "ACCEPTED" : "REJECTED"
          }, 
          {
              // mode: 'cors', 
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${sessionStorage.getItem("auth_token")}`
              },
          }
      ).then((response) => {
        console.log(response)
        toast({
          title: response.status == 200 ? "Subscription updated." : "Error",
          description: response.data.message,
          status: response.status == 200 ? "success" : "error",
          duration: 2000,
          isClosable: true,
          onCloseComplete() {
            window.location.href = "/subscription";
          },
          position: "top",
        })
      })
    }
  
    return (
      <>
        {props.action === "accept" ?
        <IconButton
            aria-label="Accept Sub"
            icon={<BsCheck2Circle />}
            bg="green.300"
            mx={1}
            size="sm"
            onClick = {onOpen}
        />:
        <IconButton
            aria-label="Reject Sub"
            icon={<MdClose />}
            bg="red.300"
            mx={1}
            size="sm"
            onClick = {onOpen}
        />

        } 

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {props.action === "accept" ? "Accept " : "Reject"} Subscription
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to {props.action === "accept" ? "accept" : "reject"} this subscription?
            </ModalBody>
  
            <ModalFooter>
              <Button variant='ghost' onClick={onClose}>Cancel</Button>
              <Button colorScheme={props.action === "accept" ? "green" : "red"} mr={3} onClick = {updateSubs}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default SubscriptionModal;