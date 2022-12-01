import { Button, Stack, Text, useBreakpointValue } from "@chakra-ui/react"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"

interface ButtonProps {
  page: number,
  setPage: (page: number) => void,
  isEnd: boolean,
}

const ButtonPagination = (props: ButtonProps) => {
  
  const buttonSize = useBreakpointValue(['xs', 'sm'])
  const { page, setPage, isEnd } = props
  return (
    <Stack direction="row" alignItems="center" spacing={{base: '5', md: '10'}} justifyContent="center" width="40%" mt={5}>
      <Button
        leftIcon={<GrFormPrevious/>}
        size={buttonSize}
        minWidth={{base: '90px', md:'100px'}}
        minHeight= "32px"
        variant="outline"
        colorScheme="green"
        disabled={page === 1 ? true : false}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </Button>
      <Text fontSize={{ base: '12px', md: '16px', lg: '20px' }}>{page}</Text>
      <Button
        rightIcon={<GrFormNext/>}
        size={buttonSize}
        minWidth={{base: '90px', md:'100px'}}
        minHeight= "32px"
        variant="outline"
        colorScheme="green"
        disabled={isEnd ? true : false}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </Stack>
  )
}

export default ButtonPagination