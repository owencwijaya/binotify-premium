import { ChakraProvider } from '@chakra-ui/react'
import AllRoutes from './AllRoutes'
import './App.css'
import defaultTheme from './themes'

function App() {

  return (
    <ChakraProvider theme = {defaultTheme}>
      <AllRoutes/>
    </ChakraProvider>
  )
}

export default App
