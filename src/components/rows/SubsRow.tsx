import { Td, Tr } from '@chakra-ui/react'
import { Subscription } from '../../interface/Subscription'
import SubscriptionModal from '../modals/SubscriptionModal'

interface Props {
  req: Subscription,
  index: number
}

const SubsRow = (props: Props) => {
  const {req, index} = props
  return (
    <Tr 
      borderRadius="md"
      color="black"
      fontWeight="semibold"
      borderBottom="1px solid #e2e8f0"
      _hover={{
        background: "green.100"
      }}
    >
      <Td
        textAlign="center"
        px={{ base: '4px', sm:'8px', md: '12px'}}
      >
        {index+1}
      </Td>
      <Td
        textAlign="center"
        px={{ base: '4px', sm:'8px', md: '12px'}}
      >
        {req.subscriber_id}
      </Td>
      <Td
        textAlign="center"
        px={{ base: '4px', sm:'8px', md: '12px'}}
      >
        {req.artist_name}
      </Td>
      <Td 
        display="flex" justifyContent="center" 
        px={{ base: '4px', sm:'8px', md: '12px'}}
      >
          <>
            <SubscriptionModal action = "accept" creator_id = {req.creator_id} subscriber_id = {req.subscriber_id} />
            <SubscriptionModal action = "reject" creator_id = {req.creator_id} subscriber_id = {req.subscriber_id} />
          </>
      </Td>
    </Tr>
  )
}

export default SubsRow