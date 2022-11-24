import { Flex, Heading } from "@chakra-ui/layout"
import { Button, Image, Input } from "@chakra-ui/react"
import { useState } from "react"
import BinotifyLogo from "../assets/images/binotify.png"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
  return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" width="30vw" minWidth={300} background="gray.300" rounded={10} padding={4}>
          <Image src={BinotifyLogo} width="75%" m={5} alignSelf="center"/>
          <Heading mb={5} color="green.700">Log In</Heading>
          
          <Input
            placeholder="user@binotify.com"
            type="email"
            mb={3}
            value={email}
          />

          <Input
            placeholder="password"
            type="password"
            mb={3}
            value={password}
          />
          <Button color="green.700">Log In</Button>
        </Flex>
      </Flex>
  )
}

export default LoginPage