import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Sidebar from './components/Sidebar'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Flex direction="row" justifyContent="center" width="100vw">
      <Sidebar/>
      <Box mt={40}>
        <App />
      </Box>
    </Flex>
    </BrowserRouter>
  </React.StrictMode>
)
