import { Flex, Heading } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, Button, Center, FormControl, FormLabel, Image, Input, Link, Text, Divider } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import BinotifyLogo from "../assets/images/binotify.png"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = () => {

    if (username === "") {
      setError(true)
      setErrorMessage("Please insert your username!");
      return;
    }

    if (password === "") {
      setError(true)
      setErrorMessage("Please insert your password!");
      return;
    }

    axios.post('http://localhost:3000/auth/login', {
      username: username,
      password: password
    }).then(
      (response) => {
        if (response.status === 200) {
          setUsername("")
          setPassword("")

          setError(false)
          setErrorMessage("");

          let auth_token = response.data.data["authToken"];
          let user_id = response.data.data["_id"];
          let is_admin = response.data.data["user"]["admin"];
          let user_name = response.data.data["user"]["name"];

          sessionStorage.setItem("auth_token", "Bearer " + auth_token);
          sessionStorage.setItem("user_id", user_id);
          sessionStorage.setItem("is_admin", is_admin);
          sessionStorage.setItem("username", user_name);

          if (is_admin) {
            window.location.href = "/subscription";
          } else {
            window.location.href = "/song";
          }
        }

        if (response.status !== 200) {
          console.log(response)
          setError(true)
          setErrorMessage("Wrong username or password!");
        }
      }
    ).catch((error) => {
      console.log(error.message);
      setError(true);
      setErrorMessage(error.message);
    })
  }


  return (
    <Center w="100vw" background="gray.300">
      <Flex height="100vh" alignItems="center" justifyContent="center" p={10}>
        <Flex direction="column" width="30vw" minWidth={300} background="white" rounded={10} padding={10} alignItems="center">
          <Flex direction="row" m={5} justifyContent="center">
            <Image src={BinotifyLogo} width="50%" alignSelf="center" />
            <Text color="green.600" ml={2} fontSize={{ base: '16px', md: '20px', lg: '24px' }}>Premium</Text>
          </Flex>
          <Divider />
          <Heading m={5} color="green.700" size="lg">Log In</Heading>

          {error &&
            <Alert status="error" my={4} rounded={4}>
              <AlertIcon />
              <AlertDescription fontSize="md">{errorMessage}</AlertDescription>
            </Alert>
          }

          <FormControl my={3}>
            <FormLabel fontWeight="semibold">Insert your registered username here</FormLabel>
            <Input
              placeholder="Insert your username here..."
              type="username"
              rounded={4}
              padding={6}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl my={3}>
            <FormLabel fontWeight="semibold">Insert your password here</FormLabel>
            <Input
              placeholder="Insert password here"
              type="password"
              rounded={4}
              padding={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button color="green.700" m={5} p={6} fontSize={18} w={"60%"} onClick={handleLogin}>Login</Button>
          <Flex direction="row">
            <Text>Don't have an account yet?</Text>
            <Link href='/register' color="green.600" fontWeight="bold" ml={1}>
              Sign Up
            </Link>
          </Flex>

        </Flex>
      </Flex>
    </Center>

  )
}

export default LoginPage