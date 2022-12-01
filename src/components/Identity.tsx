import { Box, Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react"
import axios from "axios"
import { BiLogOut } from "react-icons/bi"

const Identity = () => {
  const buttonSize = useBreakpointValue(['sm', 'md'])
  const handleLogout = () => {
    axios.get(`http://localhost:3000/logout`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("auth_token")}`
      }
    }).then((response)=>{
      sessionStorage.clear()
    })
    window.location.href = "/login"
  }

  return (
    <Flex width="95%" justifyContent="space-between" alignItems="center" pt={5} px={10}>
      <Button
        leftIcon={<BiLogOut/>}
        variant="solid"
        colorScheme="red"
        onClick={handleLogout}
        size={buttonSize}
      >
        Logout
      </Button>
      <Box>
        <Text fontWeight="bold" fontSize={{ base: '20px', md: '28px', lg: '32px' }} color="green.700">
          {sessionStorage.getItem("username")}
        </Text>
      </Box>
    </Flex>
  )
}

export default Identity