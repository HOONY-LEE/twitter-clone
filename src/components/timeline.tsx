import { useState,useEffect } from "react"
import styled from "styled-components";
import { collection, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export interface ITweet {
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt: number;
}


const Wrapper = styled.div``;

export default function Timeline() {
    
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const fetchTweets = async () => {
        const tweetsQuery = query(
            collection(db, "tweets"),
            orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(tweetsQuery);
        const tweets = snapshot.docs.map(doc => {
            const {tweet, photo, userId, username, createdAt} = doc.data();
            return {
                tweet, 
                photo, 
                userId, 
                username,  
                createdAt,
                id: doc.id
            }
        });
        setTweets(tweets)
    }

    useEffect(()=>{
        fetchTweets();
    },[])


    return <Wrapper>{JSON.stringify(tweets)}</Wrapper>
} 