import { Box, Button, Center, Flex, Heading, IconButton, Table, TableContainer, Tbody, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { BiLogOut } from "react-icons/bi"
import { BsCheck2Circle } from "react-icons/bs"
import { MdClose } from "react-icons/md"
import SubscriptionModal from "../components/SubscriptionModal"
import UploadModal from "../components/UploadModal"
import { Subscription } from "../interface/Subscription"



const SubscriptionPage = () => {
  const url = 'http://localhost:3000'
  const limit = 10
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const toast = useToast();

  useEffect(() => {
    axios.get(`${url}/subs?limit=${limit}&page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("auth_token")}`
      }
    }).then((response)=>{

      let subscriptions: Subscription [] = [];
      console.log(response.data)
      response.data.data.forEach((item: Subscription) => {
        console.log(item)
        subscriptions.push({
          creator_id: item["creator_id"],
          subscriber_id: item["subscriber_id"],
        })
      })
      console.log(subscriptions)
      setSubs(subscriptions)
    })
  }, [])

  
  
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
              <Th width="35%" fontSize="md">User ID</Th>
              <Th width="35%" fontSize="md">Artist ID</Th>
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
                    <>
                      <SubscriptionModal action = "accept" creator_id = {request.creator_id} subscriber_id = {request.subscriber_id} />
                      <SubscriptionModal action = "reject" creator_id = {request.creator_id} subscriber_id = {request.subscriber_id} />
                    </>
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