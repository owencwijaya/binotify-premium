import { Button, Center, Flex, Heading, Stack, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import UploadModal from "../components/UploadModal"
import { Song, SongRow } from "../interface/Song"

const SongPage = () => {

  const [songs, setSongs] = useState<Song[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const getSongs = (page: number) => {
    console.log("Get page song", page)

  useEffect(() => {
    console.log(sessionStorage.getItem("auth_token"))
    axios.get(`http://localhost:3000/song`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("auth_token")}`
      }
    }).then((response) => {
      console.log(response)

      var songList: Song[] = []
      response.data.data.forEach((item: Song) => {
        songList.push({
          _id: item._id,
          judul: item.judul,
          audio_path: item.audio_path
        })
      })

      setSongs(songList);
      setPage(page);
      setTotalPage(totalPage);
      console.log(songs)
    })
  })

  useEffect(() => {
    getSongs(1)
  }, [])

  return (
    <Center w = "100vw">
      <Flex mt={20} direction="column" justifyContent="flex-start" alignItems="center" width="100%" height="100vh" pt={5}>
        <Heading color="green.700" mb={5}>Your Premium Songs</Heading>
        <UploadModal for = "upload"/>
        {songs.length === 0 ?
        <Flex width="80%" mt={10} direction="column" alignItems="center">
          <TableContainer width="100%">
            <Table variant="unstyled">
              <Thead borderBottom="1px" >    
                <Tr>
                  <Th width="1%" fontSize="md">#</Th>
                  <Th width="44%" fontSize="md">Judul</Th>
                  <Th width="10%" fontSize="md"></Th>
                </Tr>:
              </Thead>
              <Tbody>
                {songs.map((song, i) => (
                  <SongRow song = {song} i = {i}/>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Stack direction="row" alignItems="center" spacing={10} justifyContent="center" width="40%" mt={5}>
            <Button
              leftIcon={<GrFormPrevious/>}
              variant="outline"
              size="md"
              minWidth="120px"
              height="40px"
              colorScheme="teal"
              display={page !== totalPage ? "block" : "none"}
              onClick={() => getSongs(page - 1)}
            >
              Previous
            </Button>
            {totalPage > 1 && (<Text>{page}/{totalPage}</Text>)}
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
          </Stack>
        </Flex>
        : <Heading size = 'md' mt = {10}>You don't have any songs yet!</Heading>}
      </Flex>
    </Center>
  )
}

export default SongPage