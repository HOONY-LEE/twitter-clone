import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import {useState} from 'react'

const Wrapper = styled.div`
    margin-top: 10px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding:  20px;
    border: 1px solid white;
    border-radius: 15px;
    overflow: hidden;
`;

const Column = styled.div`

`;

const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 15px;
`;

const Username = styled.span`
    font-weight: 600;
    font-size: 15px;
`;

const Payload = styled.p`
    margin: 10px 0px;
    font-size: 18px;
`;

const DeleteButton = styled.button`
    background-color: tomato;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding:  5px 10px;
    border-radius: 4px;
    cursor: pointer;
`;

const UpdateButton = styled.button`
    margin-left: 20px;
    background-color: white;
    color: black;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding:  5px 10px;
    border-radius: 4px;
    cursor: pointer;
`;

const TextArea = styled.textarea`
    width: 100%;
    font-size: 18px;
    color: white;
    background-color: black;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;



export default function Tweet({username, photo, tweet, userId, id}:ITweet) {
    const [editMode, setEditMode] = useState(false);
    const [editTweet, setEditTweet] = useState(tweet)
    const user = auth.currentUser;

    const onDelete = async () => {
        const ok = confirm("정말 삭제하시겠습니까?");
        if (!ok ||user?.uid !== userId) return;
        try {
            
            await deleteDoc(doc(db, "tweets", id));
            if(photo) {
                const photoRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${id}`)
                await deleteObject(photoRef)
            }
        
        
        } catch (error) {
            console.log(error)
        } finally {

        }
    }

    const onUpdate = async () => {
        setEditMode((prev) => !prev);
        if(!editMode || user?.uid !== userId) return;
        
        try {
            await updateDoc(doc(db, 'tweets', id), {
                tweet : editTweet,
            })

        } catch (error) {
            alert(error)
        }
    }

    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = e.target
        setEditTweet(value)
    }



    return <Wrapper>
        <Column>
            <Username>{username}</Username>
            {editMode ? <TextArea onChange={onChange} value={editTweet}></TextArea> : <Payload>{tweet}</Payload>}
            {user?.uid === userId ? <DeleteButton onClick={onDelete}>DELETE</DeleteButton> : null}
            {user?.uid === userId ? <UpdateButton onClick={onUpdate}>{editMode ? "Save" : "Edit"}</UpdateButton> : null}
        </Column>
        <Column>
        { photo ? 
            <Photo src={photo} object-fit></Photo>
        : null}
        </Column>
    </Wrapper>
}