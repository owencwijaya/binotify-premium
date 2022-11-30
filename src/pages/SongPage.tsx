import { Box, Button, Center, Flex, Heading, Stack, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import UploadModal from "../components/UploadModal"
import { Song, SongRow } from "../interface/Song"

const SongPage = () => {
  const limit = 3
  const [songs, setSongs] = useState<Song[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const getSongs = (page: number) => {
    console.log("Get page song", page)
    console.log(sessionStorage.getItem("auth_token"))
    axios.get(`http://localhost:3000/song?limit=${limit}&page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("auth_token")}`
      }
    }).then((response) => {
      console.log("Response:")
      console.log(response)

      var songList: Song[] = []
      response.data.data.songs.forEach((item: Song) => {
        songList.push({
          _id: item._id,
          judul: item.judul,
          audio_path: item.audio_path
        })
      })
      console.log("total page:", response.data.data.totalPages)

      setSongs(songList);
      setPage(page);
      setTotalPage(response.data.data.totalPages);
      console.log(songs)
  })
  }

  useEffect(() => {
    getSongs(1)
  }, [])

  return (
    <Center w = "100vw">
      <Flex mt={20} direction="column" justifyContent="flex-start" alignItems="center" width="100%" height="100vh" pt={5}>
        <Heading color="green.700" mb={5}>Your Premium Songs</Heading>
        <UploadModal for = "upload"/>
        {songs.length !== 0 ?
        <Flex width="80%" mt={10} direction="column" alignItems="center">
          <TableContainer width="100%">
            <Table variant="unstyled">
              <Thead borderBottom="1px" >    
                <Tr>
                  <Th width="1%" fontSize="md">#</Th>
                  <Th width="44%" fontSize="md">Judul</Th>
                  <Th width="10%" fontSize="md"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {songs.map((song, i) => (
                  <SongRow key={i} song = {song} i = {(page-1)*limit+i}/>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Stack direction="row" alignItems="center" spacing={10} justifyContent="center" width="40%" mt={5}>
            <Box minWidth="120px">
              <Button
                leftIcon={<GrFormPrevious/>}
                variant="outline"
                size="md"
                minWidth="120px"
                height="40px"
                colorScheme="teal"
                display={page !== 1 ? "block" : "none"}
                onClick={() => getSongs(page - 1)}
              >
                Previous
              </Button>
            </Box>
            (<Text>{page}/{totalPage}</Text>)
            <Box minWidth="120px">
              <Button
                rightIcon={<GrFormNext/>}
                variant="outline"
                size="md"
                minWidth="120px"
                height="40px"
                colorScheme="teal"
                display={page !== totalPage ? "block" : "none"}
                onClick={() => getSongs(page + 1)}
              >
                Next
              </Button>
            </Box>
          </Stack>
        </Flex>
        : <Heading size = 'md' mt = {10}>You don't have any songs yet!</Heading>}
      </Flex>
    </Center>
  )
}

export default SongPage;