import { Flex, Heading } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, Button, Center, Divider, FormControl, FormLabel, Image, Input, Link, Text, useToast } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import BinotifyLogo from "../assets/images/binotify.png"

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const toast = useToast()

  const checkUnique = (param: String) => {
    axios.post(`http://localhost:3000/validate/${param.toLowerCase()}`, {
      username: username,
      email: email
    }).then(
      (response) => {
        if (response.status === 204){
          setError(true);
          setErrorMessage(`${param} is already taken!`);
          return;
        }

        setError(false);
        setErrorMessage("");
      },
      (error) => {
        console.log(error);
        setError(true);
        setErrorMessage(error);
        return;
      }
    )
  }

  const validateUsername = () => {
    if ((!username.match(/^[a-zA-Z0-9_]*$/) || username.trim().length <= 0) && username.length > 0){
      setError(true)
      setErrorMessage("Username must be alphanumeric and cannot contain spaces");
      return;
    };

    checkUnique("Username");
  }

  const validateEmail = () => {
      if (!email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) && email.length > 0){
        setError(true);
        setErrorMessage("Please insert a valid email!");
        return;
      };

      checkUnique("Email");
  };


  const handleRegister = () => {
    if (name === "") {
      setError(true)
      setErrorMessage("Please insert your name!");
      return;
    }

    if (username === "") {
      setError(true)
      setErrorMessage("Please insert your username!");
      return;
    }

    if (email === "") {
      setError(true)
      setErrorMessage("Please insert your email!");
      return;
    }

    if (password === "") {
      setError(true)
      setErrorMessage("Please insert your password!");
      return;
    }

    axios.post('http://localhost:3000/auth/register', {
      name: name,
      email: email,
      username: username,
      password: password
    }).then((response) => {
      if (response.status != 200){
        setError(true);
        setErrorMessage(response.data.message);
        return;
      }
      
      toast({
        title: "Account created.",
        description: "Successfully registered user!",
        status: "success",
        duration: 2000,
        isClosable: true,
        onCloseComplete() {
          window.location.href = "/login";
        },
        position: "top",
      })
      
      setError(false);
      setErrorMessage("");
    })
    setEmail("")
    setPassword("")
  }

  const matchPassword = (confirmPass: string) => {
    if (confirmPass !== password) {
      setError(true);
      setErrorMessage("Passwords do not match!")
      return;
    } 
    setError(false);
    setErrorMessage("");
  }


  return (
    <Center w = "100vw" background = "gray.300">
      <Flex height="100vh" alignItems="center" justifyContent="center" p={10}>
        <Flex direction="column" width="30vw" minWidth={300} background="white" rounded={10} padding={10} alignItems = "center">
        <Flex direction="row" m = {5} justifyContent = "center">
            <Image src={BinotifyLogo} width="50%" alignSelf="center"/>     
            <Text color="green.600" ml = {2} fontSize={{ base: '16px', md: '20px', lg: '24px' }}>Premium</Text>
          </Flex>
          <Divider/>
          <Heading m={5} color="green.700" size = "lg">Register</Heading>

          { error &&
            <Alert status="error" my={4} rounded={4}>
              <AlertIcon />
              <AlertDescription fontSize="md">{errorMessage}</AlertDescription>
            </Alert>
          }
          
          <FormControl my={1}>
            <FormLabel>Insert your name here</FormLabel>
            <Input
              placeholder="John Doe"
              type="text"
              rounded={4}
              padding={6}
              value={name}
              height="2rem"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          
          <FormControl my={1}>
            <FormLabel>Insert your username here</FormLabel>
            <Input
              placeholder="john-doe"
              rounded={4}
              padding={6}
              value={username}
              height="2rem"
              onChange={(e) => setUsername(e.target.value)}
              onBlur = {validateUsername}
            />
          </FormControl>
          
          <FormControl my={1}>
            <FormLabel>E-mail</FormLabel>
            <Input
              placeholder="john_doe@binotify.com"
              type="email"
              rounded={4}
              padding={6}
              value={email}
              height="2rem"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
            />
          </FormControl>

          <FormControl my={1}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Input your password here"
              type="password"
              rounded={4}
              padding={6}
              value={password}
              height="2rem"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl my={1}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              placeholder="Please re-input your password here"
              type="password"
              rounded={4}
              padding={6}
              height="2rem"
              onChange={(e) => matchPassword(e.target.value)}
            />
          </FormControl>
          <Button color="green.700" m = {5} p = {6} fontSize = {18} w = {"60%"} onClick={handleRegister}>Register</Button>
          <Flex direction = "row">
            <Text>Already have an account?</Text>
            <Link href = '/' color = "green.600" fontWeight="bold" ml = {1}>
              Log In
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Center>
  )
}

export default RegisterPage