import styled from "styled-components";
import { ITweet } from "./timeline";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding:  20px;
    border: 20px;
    border-radius: 15px;
`;

const Column = styled.div`

`;

const Photo = styled.img``;

const Username = styled.span`
    font-weight: 600;
    font-size: 15px;
`;

const Payload = styled.p`
    margin: 10px 0px;
    font-size: 18px;
`;





export default function Tweet({username, photo, tweet}:ITweet) {
    return <Wrapper>
        <Column>
            <Username>{username}</Username>
            <Payload>{tweet}</Payload>
        </Column>
        { photo ? <Column>
            <Photo src={photo}></Photo>
        </Column> : null}
    </Wrapper>
}