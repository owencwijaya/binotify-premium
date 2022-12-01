import { Box, Button, Flex, Image, Spacer, Text, useBreakpointValue } from "@chakra-ui/react"
import axios from "axios"
import BinotifyLogo from '../assets/images/binotify.png';
import { BiLogOut } from "react-icons/bi"

const Identity = () => {
  const buttonSize = useBreakpointValue(['sm', 'md'])
  const handleLogout = () => {
    axios.get(`http://localhost:3000/logout`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("auth_token")}`
      }
    }).then((response) => {
      sessionStorage.clear()
    })
    window.location.href = "/login"
  }

  return (
    <Flex width="100vw" justifyContent="right" alignItems="center" p={5} bg="gray.300" borderRadius="0px 0px 10px 10px">
      <Image src={BinotifyLogo} alt="Binotify Logo" width="150px" />
      <Text color="green.600" ml={2} fontSize={{ base: '16px', md: '20px', lg: '24px' }}>Premium</Text>
      <Spacer />
      <Flex direction="row" mr={10}>
        <Text fontWeight="semibold" fontSize={{ base: '16px', md: '18px', lg: '20px' }} color="green.600">
          Hello,&nbsp;
        </Text>
        <Text fontWeight="bold" fontSize={{ base: '16px', md: '18px', lg: '20px' }} color="green.700">{sessionStorage.getItem("username")}</Text>
      </Flex>
      <Button
        leftIcon={<BiLogOut />}
        variant="solid"
        colorScheme="red"
        onClick={handleLogout}
        size={buttonSize}
      >
        Logout
      </Button>
    </Flex>
  )
}

export default Identity