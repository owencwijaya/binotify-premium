import { ChakraProvider } from '@chakra-ui/react'
import AllRoutes from './AllRoutes'
import './App.css'

function App() {

  return (
    <ChakraProvider>
      <AllRoutes/>
    </ChakraProvider>
  )
}

export default App
