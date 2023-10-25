import { useState,useEffect } from "react"
import styled from "styled-components";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Tweet from "./tweet";

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
        // const snapshot = await getDocs(tweetsQuery);
        // const tweets = snapshot.docs.map(doc => {
            // const {tweet, photo, userId, username, createdAt} = doc.data();
            // return {
            //     tweet, 
            //     photo, 
            //     userId, 
            //     username,  
            //     createdAt,
            //     id: doc.id,
        //     }
        // });
        await onSnapshot(tweetsQuery, (snapshot) => {
            const tweets = snapshot.docs.map(doc=> {
                const {tweet, photo, userId, username, createdAt} = doc.data();
                return {
                    tweet, 
                    photo, 
                    userId, 
                    username,  
                    createdAt,
                    id: doc.id,
                }
            })
            setTweets(tweets)
        })
        
    }

    useEffect(()=>{
        fetchTweets();
    },[])


    return <Wrapper>
        {tweets.map(tweet => <Tweet key={tweet.id} {...tweet}></Tweet>)}
    </Wrapper>
} 