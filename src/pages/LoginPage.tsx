import { Flex, Heading } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, Button, Center, FormControl, FormLabel, Image, Input, Link } from "@chakra-ui/react"
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

    console.log("tesss")
    axios.post('http://localhost:3000/auth/login', {
      username: username,
      password: password
    }).then(
      (response) => {
        console.log(response)
        if (response.status === 200) {
          console.log(response.data)
          let auth_token = response.data.data["authToken"];
          let is_admin = response.data.data["user"]["admin"];
          let user_id = response.data.data["user"]["_id"];
          let user_name = response.data.data["user"]["name"]

          sessionStorage.setItem("auth_token", "Bearer " + auth_token);
          sessionStorage.setItem("user_id", "6384c00c17c1599370398db7");
          sessionStorage.setItem("is_admin", is_admin);
          sessionStorage.setItem("username", user_name);

          if (is_admin){
            window.location.href = "/subscription";
          } else {
            window.location.href = "/song";
          }
        }
        console.log("salah")
        if(response.status !== 200){
          console.log(response)
          setError(true)
          setErrorMessage("Wrong username or password!");
        }
      },
      (error) => {
        console.log(error);
        setError(true);
        setErrorMessage(error);
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
            <FormLabel>Username</FormLabel>
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