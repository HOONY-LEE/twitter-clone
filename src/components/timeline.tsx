import { useState,useEffect } from "react"
import styled from "styled-components";
import { collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt: number;
}


const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    overflow-y: scroll;
`;

export default function Timeline() {
    
    const [tweets, setTweets] = useState<ITweet[]>([]);


    useEffect(()=>{
        let unsubscribe : Unsubscribe | null = null;
        const fetchTweets = async () => {
            const tweetsQuery = query(
                collection(db, "tweets"),
                orderBy("createdAt", "desc"),
                limit(10)
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
            unsubscribe =  await onSnapshot(tweetsQuery, (snapshot) => {
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
        fetchTweets();
        return () => {
            unsubscribe && unsubscribe();
        }
    },[])


    return <Wrapper>
        {tweets.map(tweet => <Tweet key={tweet.id} {...tweet}></Tweet>)}
    </Wrapper>
} 