import { Flex, Heading } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, Button, FormControl, FormLabel, Image, Input, Center, Link } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import { FaRegTimesCircle } from "react-icons/fa"
import BinotifyLogo from "../assets/images/binotify.png"

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const checkUnique = (param: String) => {
    axios.post(`http://localhost:3000/validate/${param.toLowerCase()}`, {
      username: username,
      email: email
    }).then(
      (response) => {
        console.log(response);
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
    console.log(username.length)
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
    console.log("email:", email)
    console.log("password:", password)
    console.log("username:", username)
    console.log("name:", name)

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

      alert("Successfully registered user!");
      setError(false);
      setErrorMessage("");
      window.location.href = "./login";
    })
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
    <Center w = "100vw">
      <Flex height="100vh" alignItems="center" justifyContent="center" p={10}>
        <Flex direction="column" width="30vw" minWidth={300} background="gray.300" rounded={10} padding={10} alignItems = "center">
          <Image src={BinotifyLogo} width="75%" m={5} alignSelf="center"/>
          <Heading mb={3} fontSize="2xl" color="green.700" alignSelf="center">Register</Heading>

          { error &&
            <Alert status="error" my={4} rounded={4}>
              <AlertIcon />
              <AlertDescription fontSize="md">{errorMessage}</AlertDescription>
            </Alert>
          }
          
          <FormControl my={3}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="John Doe"
              type="text"
              rounded={4}
              value={name}
              fontSize="sm"
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
              onBlur = {validateUsername}
            />
          </FormControl>
          
          <FormControl my={1}>
            <FormLabel>E-mail</FormLabel>
            <Input
              placeholder="john_doe@binotify.com"
              type="email"
              rounded={4}
              value={email}
              fontSize="sm"
              p={2}
              height="2rem"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
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
              placeholder="Confirm password"
              type="password"
              rounded={4}
              fontSize="sm"
              p={2}
              height="2rem"
              onChange={(e) => matchPassword(e.target.value)}
            />
          </FormControl>
          <Button color="green.700" mt={3} onClick={handleRegister}>Register</Button>
          <Link color = "green.600" href = '/r'>
            Already have an account? Log In
          </Link>
        </Flex>
      </Flex>
    </Center>
  )
}

export default RegisterPage