import { Box, Flex, IconButton, Image, Link, Text, useMediaQuery } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import BinotifyLogo from '../assets/images/binotify.png'
import { User } from "../interface/User"


const Header = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 1000px)')
  let user : User = {
    user_id: 1,
    username: "Tulus",
    isAdmin: false
  }

  return (
    <Flex 
      alignItems="center"
      p="6"
      bg="white"
      fontSize={isSmallScreen ? "sm" : "1.5rem"}
      pos="fixed"
      top="0"
      left="0"
      height="60"
      justifyContent={isSmallScreen ? "space-between" : "flex-end"}
      w="100vw"
    >
      {isSmallScreen && (
        <Box width="15%" justifyContent="flex-start">
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            variant="outline"
            aria-label="Open Menu"
            // onClick={onOpen}
            icon={<FiMenu />}
          />
        </Box>
      )}

      {isSmallScreen && (
        <Link href='/'>
          <Image src={BinotifyLogo} alt="Binotify Logo" width="150px"/>
        </Link>
      )}

      <Box width="25%" display="flex" justifyContent="center">
        <Text 
          fontWeight={600}
          ml="4">
          Hello, {user.username}
        </Text>
      </Box>
    </Flex>
  )
}

export default Header