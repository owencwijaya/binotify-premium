import { Box, Button, Center, Flex, Heading, IconButton, Table, TableContainer, Tbody, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { BiLogOut } from "react-icons/bi"
import { BsCheck2Circle } from "react-icons/bs"
import { MdClose } from "react-icons/md"
import { Status } from "../interface/Status"
import { Subscription } from "../interface/Subscription"



const SubscriptionPage = () => {
  const url = 'http://localhost:3000'
  const [subs, setSubs] = useState<Subscription[]>([]);
  const toast = useToast();

  useEffect(() => {
    axios.get(`${url}/subs?limit=5&page=1`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("auth_token")}`
      }
    }).then((response)=>{
      console.log(response)
      let subscriptions: Subscription [] = [];

      response.data.data.forEach((item: Subscription) => {

        subscriptions.push({
          creator_id: item.creator_id,
          subscriber_id: item.subscriber_id,
          status: item.status
        })
      })
      setSubs(subscriptions)
    })
  }, [])

  const handleDecline = (subscriber_id: number | null, creator_id: string | null) => {
    console.log("delete request from", subscriber_id, "to", creator_id)
    axios.put(`${url}/subs/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("auth_token")}`
      },
      data: {
        'user_id': `${sessionStorage.getItem("user_id")}`,
        'subscriber_id': `${subscriber_id}`,
        'creator_id': `${creator_id}`,
        'new_status': Status.REJECTED
      }
    }).then((response)=>{
      console.log(response)
      if (response.status === 200) {
        console.log("success")
        toast({
          title: "Request declined",
          description: "Success decline a request",
          status: "success",
          duration: 9000,
          position: "top",
          isClosable: true,
        })
      }
    })
  }

  const handleAccept = (subscriber_id: number | null, creator_id: string | null) => {
    console.log("edit request from", subscriber_id, "to", creator_id)
    axios.put(`${url}/subs/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("auth_token")}`
      },
      data: {
        'user_id': `${sessionStorage.getItem("user_id")}`,
        'subscriber_id': `${subscriber_id}`,
        'creator_id': `${creator_id}`,
        'new_status': Status.ACCEPTED
      }
    }).then((response)=>{
      console.log(response)
      if (response.status === 200) {
        console.log("success")
        toast({
          title: "Request accepted",
          description: "Success accepted a request",
          status: "success",
          duration: 9000,
          position: "top"
        })}
    })
  }
  
  const handleLogout = () => {
    axios.get(`${url}/logout`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("auth_token")}`
      }
    }).then((response)=>{
      console.log("Response logout", response)
      sessionStorage.clear()
    })
    window.location.href = "/login"
  }

  return (
    <Box minHeight="100vh">
    <Flex justifyContent="flex-start" mt={5} ml={5}>
      <Button
        leftIcon={<BiLogOut/>}
        variant="solid"
        colorScheme="red"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Flex>
    <Center w="100vw">
    <Flex mt={20} direction="column" justifyContent="flex-start" alignItems="center" width="100%" height="100vh" pt={5}>
      <Heading color="green.700">Subscription Request</Heading>
      {subs.length > 0 ? (
      <TableContainer width="80%" mt={10}>
        <Table variant="unstyled">
          <Thead borderBottom="1px" >
            <Tr>
              <Th width="1%" fontSize="md">#</Th>
              <Th width="44%" fontSize="md">Username</Th>
              <Th width="25%" fontSize="md">Penyanyi</Th>
              <Th width="10%" fontSize="md" display="flex" justifyContent="center">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {subs.map((request, i) => (
              <Tr 
                key={i}
                _hover={{
                  background: "teal.100"
                }}
              >
                <Th>{i+1}</Th>
                <Th>{request.subscriber_id}</Th>
                <Th>{request.creator_id}</Th>
                <Th display="flex" justifyContent="center">
                  {request.status === Status.PENDING && (
                    <>
                      <IconButton
                        aria-label="Delete Song"
                        icon={<MdClose />}
                        bg="red.300"
                        mx={1}
                        size="sm"
                        onClick={() => handleDecline(request.subscriber_id, request.creator_id)}
                      />
                      <IconButton
                        aria-label="Edit Song"
                        icon={<BsCheck2Circle />}
                        bg="green.300"
                        mx={1}
                        size="sm"
                        onClick={() => handleAccept(request.subscriber_id, request.creator_id)}
                      />
                    </>
                  )}
                  {request.status === Status.ACCEPTED && (
                    <IconButton
                    aria-label="Delete Song"
                    icon={<BsCheck2Circle />}
                    bg="green.300"
                    size="sm"
                    disabled
                    _hover={{}}
                  />
                  )}
                  {request.status === Status.REJECTED && (
                    <IconButton
                      aria-label="Delete Song"
                      icon={<MdClose />}
                      bg="red.300"
                      size="sm"
                      disabled
                      _hover={{}}
                    />
                  )}
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    ) : <Heading size = 'md' mt = {10}>You don't have any requests yet!</Heading> }
    </Flex>
    </Center>
    </Box>
  )
}

export default SubscriptionPage