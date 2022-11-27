import { Box, Flex, Icon, Image, Link, Text, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { FiHome, FiMusic, FiUserPlus } from 'react-icons/fi';
import BinotifyLogo from '../assets/images/binotify.png';
import { NavMenuItem } from '../interface/NavMenuItem';

const menuSidebar: NavMenuItem[] = [
  { name: 'Home', link: '/' , icon: FiHome },
  { name: 'Songs', link: '/song' , icon: FiMusic },
  { name: 'Subscription', link: '/subscription', icon: FiUserPlus }
];

const Sidebar = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 1000px)')
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
        transition="3s ease"
        bg='black'
        // display={{ base: 'none', md: 'block' }}
        display={isSmallScreen ? 'none' : 'block'}
        w={200}
        // w={{ base: '60', md: 200 }}
        h="100vh"
        pos="fixed"
        zIndex={1}
        color="white"
        py={20}>
        <Flex h="80" alignItems="center" mx="8" justifyContent="center">
          <Link href='/'>
            <Image src={BinotifyLogo} alt="Binotify Logo" width="150px"/>
          </Link>
          {/* <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} /> */}
        </Flex>
        <Box mt={10} ml={20}>
          {menuSidebar.map((item) => (
            <NavItem key={item.name} {...item}/>
          ))}
        </Box>
      </Box>
  )
}

const NavItem = ({name, link, icon} : NavMenuItem) => {
  return (
    <Link href={link} style={{textDecoration:'none'}} _focus={{boxShadow: 'none'}}>
      <Flex
        direction="row"
        alignItems="center"
        p="4"
        cursor="pointer"
        w="100%"
        h={40}
        fontSize="1.25rem"
      >
        <Icon as={icon} mr="4" />
        <Text ml="4">
          {name}
        </Text>
      </Flex>
    </Link>
  )
}

export default Sidebar