import { HStack, Th, Tr } from "@chakra-ui/react"
import DeleteModal from "../components/DeleteModal"
import UploadModal from "../components/UploadModal"

export interface Song {
  _id  : string | null,
  judul: string | null,
  audio_path: string | null,
}

export const SongRow = (props: any) => {
  return (
    <Tr
      key={props.song._id}
      _hover={{
        background: "teal.100"
      }}
    >
    <Th>{props.i + 1}</Th>
    <Th>{props.song.judul}</Th>
    <Th>
      <HStack spacing={5}>
        <UploadModal for = "edit" song_id = {props.song._id}/>
        <DeleteModal song_id = {props.song._id} title = {props.song.judul} />
      </HStack>
    </Th>
  </Tr>
  )
}