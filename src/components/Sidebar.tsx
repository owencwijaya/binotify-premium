import { Box, BoxProps, CloseButton, Drawer, DrawerContent, Flex, FlexProps, HStack, Icon, IconButton, Image, Link, Text, useDisclosure } from '@chakra-ui/react';
import { BiUserCircle } from 'react-icons/bi';
import { FiHome, FiMenu, FiMusic, FiUserPlus } from 'react-icons/fi';
import BinotifyLogo from '../assets/images/binotify.png';
import { NavMenuItem } from '../interface/NavMenuItem';
import { User } from '../interface/User';

const menuSidebar: NavMenuItem[] = [
  { name: 'Home', link: '/' , icon: FiHome },
  { name: 'Songs', link: '/song' , icon: FiMusic },
  { name: 'Subscription', link: '/subscription', icon: FiUserPlus }
];

const Sidebar = () => {
  let user : User = {
    user_id: null,
    username: null,
    isAdmin: true
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex minH="100vh" bg='aqua' justifyContent="center" left={0}>
      {/* <SidebarContent 
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      /> */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <Header onOpen={onOpen} user={user}/>
      
    </Flex>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg='white'
      borderRight="1px"
      borderRightColor='gray.700'
      w='full'
      // w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="100vh"
      my={20}>
      <Flex h="80" alignItems="center" mx="8" justifyContent="space-between">
        <Link href='/'>
          <Image src={BinotifyLogo} alt="Binotify Logo" width="150px"/>
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {menuSidebar.map((item) => (
        <NavItem {...item}/>
      ))}
    </Box>
  )
}

const NavItem = ({name, link, icon} : NavMenuItem) => {
  return (
    <Link href={link} style={{textDecoration:'none'}} _focus={{boxShadow: 'none'}}>
      <Flex direction="row" alignItems="center" p="4" cursor="pointer" _hover={{ bg: 'gray.100' }}>
        <Icon as={icon} mr="4" />
        <Text fontSize="sm" ml="4">
          {name}
        </Text>
      </Flex>
    </Link>
  )
}

interface HeaderProps extends FlexProps {
  onOpen: () => void;
  user: User;
}

const Header = ({onOpen, user}: HeaderProps) => {
  return (
    <Flex 
      alignItems="center"
      p="4"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent='space-between'
      w="100%"
      pos="fixed"
      top={0}
      left={0}
    >
      <Flex width="15%" justifyContent="flex-start">
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          variant="outline"
          aria-label="Open Menu"
          onClick={onOpen}
          icon={<FiMenu />}
        />
      </Flex>

      <Link href='/'>
        <Image src={BinotifyLogo} alt="Binotify Logo" width="150px"/>
      </Link>

      <Flex width="15%" justifyContent="flex-end">
        <HStack spacing={{ base: '0', md: '6' }}>
          { user.username == null ? (
            <Link href='/login'>
              <Flex direction="row">
                <Text fontSize="md" mx="4">
                  Login
                </Text>
                <IconButton
                  aria-label="User Profile"
                  mx={4}
                  icon={<BiUserCircle />}
                />
              </Flex>
            </Link>
          ) : (
            <>
              <Text 
                fontSize="sm"
                fontWeight="bold"
                ml="4">
                {user.username}
              </Text>

              <IconButton
                aria-label="User Profile"
                icon={<BiUserCircle />}
              />
            </>
          )}
        </HStack>
      </Flex>
    </Flex>
  )
}

export default Sidebar