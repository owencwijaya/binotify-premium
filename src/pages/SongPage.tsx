import { Flex, Heading, IconButton, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { FaRegTrashAlt } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { Song } from "../interface/Song"

const Songs: Song[] = [
  {
    song_id: 1,
    judul: "Hati-Hati di Jalan",
    penyanyi: "Tulus",
    tanggal_terbit: new Date("2020-01-01"),
    genre: "Pop",
    duration: 180,
    audio_path: "https://www.youtube.com/watch?v=_N6vSc_mT6I",
    image_path: "",
    album_id: 1,
    album_name: "Manusia"
  }, {
    song_id: 2,
    judul: "Diri",
    penyanyi: "Tulus",
    tanggal_terbit: new Date("2020-01-01"),
    genre: "Pop",
    duration: 180,
    audio_path: "https://www.youtube.com/watch?v=fsGcUWiylW8",
    image_path: "",
    album_id: 1,
    album_name: "Manusia"
  }
]

const SongPage = () => {

  const handleClick = (song_id: number | null) => {
    console.log("click", song_id)
  }

  const handleDelete = (song_id: number | null) => {
    console.log("delete", song_id)
  }

  const handleEdit = (song_id: number | null) => {
    console.log("edit", song_id)
  }

  return (
    <Flex direction="column" justifyContent="flex-start" alignItems="center" width="100vw" height="100vh" pt={5}>
      <Heading color="green.700">Your Premium Songs</Heading>
      <TableContainer width="80vw" mt={10}>
        <Table variant="unstyled">
          <Thead borderBottom="1px" >
            <Tr>
              <Th width="1vw" fontSize="md">#</Th>
              <Th width="44vw" fontSize="md">Judul</Th>
              <Th width="15vw" fontSize="md">Album</Th>
              <Th width="10vw" fontSize="md">Durasi</Th>
              <Th width="10vw" fontSize="md"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {Songs.map((song, i) => (
              <Tr 
                key={song.song_id}
                _hover={{
                  background: "teal.100"
                }}
                onClick={() => handleClick(song.song_id)}
              >
                <Th>{i+1}</Th>
                <Th>{song.judul}</Th>
                <Th>{song.album_name}</Th>
                <Th>{song.duration}</Th>
                <Th display="flex" justifyContent="space-between">
                  <IconButton
                    aria-label="Delete Song"
                    icon={<FaRegTrashAlt />}
                    bg="red.300"
                    onClick={() => handleDelete(song.song_id)}
                  />
                  <IconButton
                    aria-label="Edit Song"
                    icon={<MdEdit />}
                    bg="green.300"
                    onClick={() => handleEdit(song.song_id)}
                  />
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}

export default SongPage