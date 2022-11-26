import { Flex, Heading } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, Button, FormControl, FormLabel, Image, Input } from "@chakra-ui/react"
import { useState } from "react"
import BinotifyLogo from "../assets/images/binotify.png"

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleRegister = () => {
    console.log("email:", email)
    console.log("password:", password)
    setEmail("")
    setPassword("")
  }

  const matchPassword = (confirmPass: string) => {
    if (confirmPass !== password) {
      console.log("passwords don't match")
    } else {
      console.log("passwords match")
    }
  }


  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" width="30vw" minWidth={300} background="gray.300" rounded={10} padding={4}>
          <Image src={BinotifyLogo} width="50%" m={3} alignSelf="center"/>
          <Heading mb={3} fontSize="2xl" color="green.700" alignSelf="center">Register</Heading>

          { error &&
            <Alert status="error" my={4} rounded={4}>
              <AlertIcon />
              <AlertDescription fontSize="md">{errorMessage}</AlertDescription>
            </Alert>
          }
          
          <FormControl my={1}>
            <FormLabel>Nama</FormLabel>
            <Input
              placeholder="John Doe"
              type="text"
              rounded={4}
              value={name}
              fontSize="sm"
              p={2}
              height="2rem"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          
          <FormControl my={1}>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="john-doe"
              type="text"
              rounded={4}
              value={username}
              fontSize="sm"
              p={2}
              height="2rem"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          
          <FormControl my={1}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="john_doe@binotify.com"
              type="email"
              rounded={4}
              value={email}
              fontSize="sm"
              p={2}
              height="2rem"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl my={1}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              type="password"
              rounded={4}
              value={password}
              fontSize="sm"
              p={2}
              height="2rem"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl my={1}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              placeholder="confirm password"
              type="password"
              rounded={4}
              fontSize="sm"
              p={2}
              height="2rem"
              onChange={(e) => matchPassword(e.target.value)}
            />
          </FormControl>
          <Button color="green.700" mt={3} onClick={handleRegister}>Log In</Button>
        </Flex>
      </Flex>
  )
}

export default RegisterPage