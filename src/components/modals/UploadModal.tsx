import {
    Button, Flex, FormControl,
    FormErrorMessage,
    FormLabel, IconButton, Input, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Spacer, Text, useDisclosure
} from '@chakra-ui/react';

import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { storage } from '../../firebase';

const UploadForm = (props: any) => {
    const [title, setTitle] = useState<string>(props.title || "");
    const [file, setFile] = useState<File>();
    const [titleError, setTitleError] = useState<boolean>(false);
    const [fileError, setFileError] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [isUploading, setUploading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleAudioFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const retrievedFile: File = event.target.files![0];
        console.log(retrievedFile);
        setFile(retrievedFile);
    }

    const handleTitleChange = (event: any) => setTitle(event.target.value);

    const sendSong = async(event: SyntheticEvent) => {
        if (!file && props.for === "upload") {
            setFileError(true);
            alert("Please upload the song file!")
            return;
        }

        if (title.length === 0){
            setTitleError(true);
            alert("Please enter the title!" + titleError)
            return;
        }

        if (file){
            const extension: string | undefined = file.name.split('.').pop();
            const allowedExtensions: string[] = ["mp3", "wav", "ogg"];

            if (!allowedExtensions.includes(extension!) || extension === undefined){
                setFileError(true);
                alert("Invalid file extension!")
                return;
            }

                
            setUploading(true);
            setFileError(false);
            setTitleError(false);

            const storageRef = ref(storage, `/files/${file!.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);


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
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl: string) => {
                        setUploading(false);

                        axios({
                            method: props.for === "upload" ? 'post' : 'put',
                            url: `http://localhost:3000/song${props.for !== "upload" ? `/${props.song_id}` : ""}`,
                            data: {
                                judul: title,
                                audio_path: downloadUrl,
                            },
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `${sessionStorage.getItem("auth_token")}`
                            },
  
                          }).then((response) => {
                            if(response.status === 200){
                                setSuccess(true)
                                setTimeout(() => {
                                    window.location.href = '/song'
                                }, 500);
                            }
                        });
                    });
                }
            )
        } else {
            axios.put(
                `http://localhost:3000/song${props.for === "edit" ? `/${props.song_id}` : ""}`,{
                    judul: title,
                    audio_path: props.audio_path,
                },
                { 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${sessionStorage.getItem("auth_token")}`
                    },
                }
            ).then((response) => {
                if(response.status === 200){
                    setSuccess(true)
                    setTimeout(() => {
                        window.location.href = '/song'
                    }, 500);

                }
            })
        }
    }


    return(
        <>
            <FormControl isInvalid = {titleError}>
                <FormLabel>Song Title</FormLabel>
                <Input type = 'name' value = {title}  onChange = {handleTitleChange} placeholder = "Insert your song title here..." />
                {titleError && <FormErrorMessage>Please input the song title.</FormErrorMessage>}

            </FormControl>

            <FormControl mt = {5} isInvalid = {fileError}>
                <FormLabel>Song File</FormLabel>
                <Input type = 'file' onChange = {handleAudioFile} h = {16} p = {4}/>
                {fileError && <FormErrorMessage>Please input a valid song file. (Allowed extensions: .mp3, .ogg, .wav)</FormErrorMessage>}
            </FormControl>

            <Progress colorScheme = 'green'  mt = {5} size = 'md' isIndeterminate={isUploading}/>
            <Flex dir = "row" mt = {5}>
                <Text hidden={!success}>Song successfully {props.for === 'upload' ? 'uploaded' : 'edited'}!</Text>
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

    return (
        <>
          {props.for === "upload" ? <Button onClick={onOpen} variant="solid" colorScheme="teal">Add a New Song!</Button> :
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
                <UploadForm for = {props.for} song_id = {props.song_id} audio_path = {props.audio_path} title = {props.title}/>
              </ModalBody>
    
              <ModalFooter>

              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default UploadModal;