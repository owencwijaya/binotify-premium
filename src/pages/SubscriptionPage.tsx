import { Box, Center, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import Identity from "../components/Identity"
import SubscriptionModal from "../components/SubscriptionModal"
import { Subscription } from "../interface/Subscription"



const SubscriptionPage = () => {
  const url = 'http://localhost:3000'
  const limit = 10
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const breakpointSize = useBreakpointValue(['md', 'lg', 'xl'])

  const getSubscription = () => {
    axios.get(`${url}/subs?limit=${limit}&page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("auth_token")}`
      }
    }).then((response)=>{

      let subscriptions: Subscription [] = [];
      // console.log(response.data)
      response.data.data.forEach((item: Subscription) => {
        // console.log(item)
        subscriptions.push({
          creator_id: item["creator_id"],
          subscriber_id: item["subscriber_id"],
        })
      })
      // console.log(subscriptions)
      setSubs(subscriptions)
    })
  }
  useEffect(() => {
    getSubscription()
    setInterval(getSubscription, 10000)
  }, [])

  return (
    <Box minHeight="100vh">
    <Identity/>
    <Center w="100vw">
    <Flex mt={20} direction="column" justifyContent="flex-start" alignItems="center" width="100%" height="100vh" pt={5}>
      <Heading color="green.700" size={breakpointSize}>Subscription Request</Heading>
      {subs.length > 0 ? (
      <TableContainer width="80%" mt={10} borderRadius="md">
        <Table variant="unstyled">
          <Thead borderBottom="1px" color="green.900" bg="green.200">
            <Tr>
              <Th width="1%" fontSize="md" textAlign="center">#</Th>
              <Th width="35%" fontSize="md">User ID</Th>
              <Th width="35%" fontSize="md">Artist ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {subs.map((request, i) => (
              <Tr 
                key={i}
                borderRadius="md"
                color="black"
                fontWeight="semibold"
                borderBottom="1px solid #e2e8f0"
                _hover={{
                  background: "teal.100"
                }}
              >
                <Td textAlign="center" px={{ base: '4px', sm:'8px', md: '12px'}}>{i+1}</Td>
                <Td px={{ base: '4px', sm:'8px', md: '12px'}}>{request.subscriber_id}</Td>
                <Td px={{ base: '4px', sm:'8px', md: '12px'}}>{request.creator_id}</Td>
                <Td display="flex" justifyContent="center" px={{ base: '4px', sm:'8px', md: '12px'}}>
                    <>
                      <SubscriptionModal action = "accept" creator_id = {request.creator_id} subscriber_id = {request.subscriber_id} />
                      <SubscriptionModal action = "reject" creator_id = {request.creator_id} subscriber_id = {request.subscriber_id} />
                    </>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    ) : <Heading fontSize={{ base: '16px', md: '20px', lg: '24px' }} mt = {5}>You don't have any requests yet!</Heading> }
    </Flex>
    </Center>
    </Box>
  )
}

export default SubscriptionPage