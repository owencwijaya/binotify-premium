import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Heading,
    useDisclosure,
    Flex,
    Spacer,
    Progress,
    Text,
    IconButton
} from '@chakra-ui/react'

import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import { SyntheticEvent } from 'react';
import { storage } from '../firebase';
import { useState } from 'react';
import { MdEdit } from "react-icons/md";
import SongPage from '../pages/SongPage';

const UploadForm = (props: any) => {
    const [title, setTitle] = useState<string>("");
    const [file, setFile] = useState<File>();
    const [url, setUrl] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [isUploading, setUploading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleAudioFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const retrievedFile: File = event.target.files![0];
        console.log(retrievedFile);
        setFile(retrievedFile);
        console.log(file)
    }

    const handleTitleChange = (event: any) => setTitle(event.target.value);

    const sendSong = async(event: SyntheticEvent) => {
        let payload = {};
        if (!file && props.for === "upload") {
            alert("Please upload the song file!")
            return;
        }

        if (file){
            const storageRef = ref(storage, `/files/${file!.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            setUploading(true);
            uploadTask.on("state_changed", 
            (snapshot) => {
                const progressValue = Math.round(snapshot.bytesTransferred * 100 / snapshot.totalBytes) ;
                setProgress(progressValue);
            },
    
                (error: any) => {
                    console.log(error);
                    return;
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL:string) => {
                        console.log(downloadURL)
                    })
                }
            )
        }

        if (title === "") {
            alert("Please enter a title!");
            return;
        }
        
        if(url !== "") {
            payload = {
                judul: title,
                audio_path: url
            }
        }else{
            payload = {
                judul: title,
            }
        }

        fetch(
            `http://localhost:3000/song${props.for !== "upload" ? `/${props.song_id}` : ""}`,
            {
                method: props.for === 'upload' ? 'POST' : 'PUT',
                // mode: 'cors', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionStorage.getItem("auth_token")}`
                },
                body: JSON.stringify(payload)
            }
        ).then((response) => {
            if(response.status === 200){
                setSuccess(true)
            }
        })
    }

    return(
        <>
            <FormControl>
                <FormLabel>Song Title</FormLabel>
                <Input type = 'name' value = {title} onChange = {handleTitleChange} />
                <FormLabel mt = {5}>Song File</FormLabel>
                <Input py = {1} type = 'file' onChange = {handleAudioFile}/>
            </FormControl>
            <Progress colorScheme='green' size='md'  mt = {5} value = {progress}/>
            <Flex dir = "row" mt = {5}>
                <Text hidden={!success}>Song successfully uploaded!</Text>
                <Spacer/>
                <Button colorScheme='green' mr={3} onClick={sendSong} alignSelf='right' disabled={isUploading} >
                    {props.for === 'upload' ? 'Add Song' : 'Update Song'}
                </Button>
            </Flex>

        </>
    )
}

const UploadModal = (props: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ isUploading, setUploading ] = useState(false);
    return (
        <>
          {props.for === "upload" ? <Button onClick={onOpen}>Add Song</Button> :
            <IconButton
                aria-label="Edit Song"
                icon={<MdEdit />}
                bg="green.300"
                size="sm"
                onClick={onOpen}
                />
          } 
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{props.for === "upload" ? "Add a New" : "Edit"} Song</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <UploadForm for = {props.for} song = {props.song_id} />
              </ModalBody>
    
              <ModalFooter>

              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default UploadModal;