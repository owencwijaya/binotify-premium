import { Box, Center, Flex, Heading, Table, TableContainer, Tbody, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import ButtonPagination from "../components/ButtonPagination"
import Identity from "../components/Identity"
import SubsRow from "../components/rows/SubsRow"
import { Subscription } from "../interface/Subscription"

const SubscriptionPage = () => {
  const url = 'http://localhost:3000'
  const limit = 5
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [page, setPage] = useState<number>(1)
  const breakpointSize = useBreakpointValue(['md', 'lg', 'xl'])

  const setPages = (page: number) => {
    axios.get(`${url}/subs?limit=${limit}&page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("auth_token")}`
      }
    }).then((response)=>{
      var subscriptions: Subscription [] = [];

      if (response.data.data.length > 1){
        response.data.data.forEach((item: Subscription) => {
          subscriptions.push({
            creator_id: item["creator_id"],
            subscriber_id: item["subscriber_id"],
          })
        })
      } else {
        subscriptions.push({
          creator_id: response.data.data["creator_id"],
          subscriber_id: response.data.data["subscriber_id"],
        })
      }

      setSubs(subscriptions);
      setPage(page);
    })
  }
  useEffect(() => {
    setPages(1);
  }, [])


  const is_admin = sessionStorage.getItem("is_admin") === "true"

  if (!is_admin){
    return <Navigate to = "/song" replace />
  }


  return (
    <Box minHeight="100vh" pb={10}>
      <Identity/>
      <Center w="100vw">
        <Flex mt={{base: '5', md: '10'}} direction="column" justifyContent="flex-start" alignItems="center" width="100%" height="100%">
          <Heading color="green.700" size={breakpointSize}>Subscription Request</Heading>
          {subs.length > 0 ?
          <Flex width={{base: '100%', md: '80%'}} mt={{base: '5', md: '10'}} direction="column" alignItems="center">
            <TableContainer width="100%" mt={{base: '5', md: '10'}} borderRadius="md">
              <Table variant="unstyled">
                <Thead borderBottom="1px" color="green.900" bg="green.200">
                  <Tr>
                    <Th width="1%" fontSize="md" textAlign="center">#</Th>
                    <Th width="25%" fontSize="md" textAlign="center">User ID</Th>
                    <Th width="45%" fontSize="md" textAlign="center">Artist ID</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {subs.map((request, i) => (
                    (i < limit) &&
                    <SubsRow key={i} req={request} index={(page-1)*limit+i}/>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <ButtonPagination page={page} setPage={setPages} isEnd={subs.length <= limit}/>
          </Flex>
        : <Heading fontSize={{ base: '16px', md: '20px', lg: '24px' }} mt = {5}>You don't have any requests yet!</Heading> }
        </Flex>
      </Center>
    </Box>
  )
}

export default SubscriptionPage