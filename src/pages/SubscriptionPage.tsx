import { Flex, Heading, IconButton, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { BsCheck2Circle } from "react-icons/bs"
import { MdClose } from "react-icons/md"
import { Status } from "../interface/Status"
import { SubscriptionRequest } from "../interface/SubscriptionRequest"

const requestList: SubscriptionRequest[] = [
  {
    subscriber_id: 1,
    username: "user1",
    creator_id: 1,
    penyanyi: "Denny Caknan",
    status: Status.PENDING
  },   {
    subscriber_id: 2,
    username: "user2",
    creator_id: 1,
    penyanyi: "Guyon Waton",
    status: Status.ACCEPTED
  },   {
    subscriber_id: 3,
    username: "user3",
    creator_id: 2,
    penyanyi: "NIKI",
    status: Status.REJECTED
  }
]

const SubscriptionPage = () => {

  const handleDelete = (subscriber_id: number | null, creator_id: number | null) => {
    console.log("delete request from", subscriber_id, "to", creator_id)
  }

  const handleEdit = (subscriber_id: number | null, creator_id: number | null) => {
    console.log("edit request from", subscriber_id, "to", creator_id)
  }

  return (
    <Flex direction="column" justifyContent="flex-start" alignItems="center" width="100vw" height="100vh" pt={5}>
      <Heading color="green.700">Subscription Request</Heading>
      <TableContainer width="80vw" mt={10}>
        <Table variant="unstyled">
          <Thead borderBottom="1px" >
            <Tr>
              <Th width="1vw" fontSize="md">#</Th>
              <Th width="44vw" fontSize="md">Username</Th>
              <Th width="25vw" fontSize="md">Penyanyi</Th>
              <Th width="10vw" fontSize="md" display="flex" justifyContent="center">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {requestList.map((request, i) => (
              <Tr 
                key={i}
                _hover={{
                  background: "teal.100"
                }}
              >
                <Th>{i+1}</Th>
                <Th>{request.username}</Th>
                <Th>{request.penyanyi}</Th>
                <Th display="flex" justifyContent="center">
                  {request.status === Status.PENDING && (
                    <>
                      <IconButton
                        aria-label="Delete Song"
                        icon={<MdClose />}
                        bg="red.300"
                        mx={1}
                        onClick={() => handleDelete(request.subscriber_id, request.creator_id)}
                      />
                      <IconButton
                        aria-label="Edit Song"
                        icon={<BsCheck2Circle />}
                        bg="green.300"
                        mx={1}
                        onClick={() => handleEdit(request.subscriber_id, request.creator_id)}
                      />
                    </>
                  )}
                  {request.status === Status.ACCEPTED && (
                    <IconButton
                    aria-label="Delete Song"
                    icon={<BsCheck2Circle />}
                    bg="green.300"
                    disabled
                    _hover={{}}
                  />
                  )}
                  {request.status === Status.REJECTED && (
                    <IconButton
                      aria-label="Delete Song"
                      icon={<MdClose />}
                      bg="red.300"
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
    </Flex>
  )
}

export default SubscriptionPage