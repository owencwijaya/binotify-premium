import { Flex, Heading } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, Button, FormControl, FormLabel, Image, Input } from "@chakra-ui/react"
import { useState } from "react"
import BinotifyLogo from "../assets/images/binotify.png"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = () => {
    console.log("email:", email)
    console.log("password:", password)
    setEmail("")
    setPassword("")
  }
  
    
  return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" width="30vw" minWidth={300} background="gray.300" rounded={10} padding={4}>
          <Image src={BinotifyLogo} width="75%" m={5} alignSelf="center"/>
          <Heading mb={3} color="green.700">Log In</Heading>

          { error &&
            <Alert status="error" my={4} rounded={4}>
              <AlertIcon />
              <AlertDescription fontSize="md">{errorMessage}</AlertDescription>
            </Alert>
          }
          
          <FormControl my={3}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="user@binotify.com"
              type="email"
              rounded={4}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl my={3}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              type="password"
              rounded={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button color="green.700" mt={3} onClick={handleLogin}>Log In</Button>
        </Flex>
      </Flex>
  )
}

export default LoginPage