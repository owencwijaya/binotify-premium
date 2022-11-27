import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Box bg="cyan.200" minH="100vh" minW="100vw">
      <Sidebar/>
      <Flex
        direction="column"
        alignItems="center"
        ml={200}
        justifyContent="center"
        bg="burlywood"
        w="full"
      >
        <Header />
        <App />
      </Flex>
    </Box>
    </BrowserRouter>
  </React.StrictMode>
)
