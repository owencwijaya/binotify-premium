import { Flex, Heading } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, Button, FormControl, FormLabel, Image, Input, Center, Link } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import BinotifyLogo from "../assets/images/binotify.png"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = () => {
    console.log("username:", username)
    console.log("password:", password)

    if (username === "") {
      setError(true)
      setErrorMessage("Please insert your username!");
      return;
    }

    if (password === ""){
      setError(true)
      setErrorMessage("Please insert your password!");
      return;
    }


    axios.post('http://localhost:3000/auth/login', {
      username: username,
      password: password
    }).then(
      (response) => {
        console.log(response);
        if (response.status === 200) {
          const api_key = response.data.data["api_key"];
          const auth_token = response.data.data["auth_token"];
          const is_admin = response.data.data["is_admin"];

          sessionStorage.setItem("auth_token", "Bearer " + auth_token);
          sessionStorage.setItem("api_key", api_key);

          if (is_admin){
            window.location.href = "/subscription";
          } else {
            window.location.href = "/song";
          }
        }
      },
      (error) => {
        console.log(error);
        setError(true);
        setErrorMessage(error);
        return;
      }
    )
    setUsername("")
    setPassword("")

    setError(false)
    setErrorMessage("");
  }
  
    
  return (
    <Center w="100vw">
      <Flex height="100vh" alignItems="center" justifyContent="center" p={10}>
        <Flex direction="column" width="30vw" minWidth={300} background="gray.300" rounded={10} padding={10} alignItems = "center">
          <Image src={BinotifyLogo} width="75%" m={5} alignSelf="center"/>
          <Heading mb={3} color="green.700">Log In</Heading>

          { error &&
            <Alert status="error" my={4} rounded={4}>
              <AlertIcon />
              <AlertDescription fontSize="md">{errorMessage}</AlertDescription>
            </Alert>
          }
          
          <FormControl my={3}>
            <FormLabel>username</FormLabel>
            <Input
              placeholder="Insert username here"
              type="username"
              rounded={4}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <Link href = '/register' color = "green.600">
            Don't have an account yet? Sign Up
          </Link>
        </Flex>
      </Flex>
    </Center>

  )
}

export default LoginPage