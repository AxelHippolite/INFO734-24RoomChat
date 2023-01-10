import {PageWrapper} from "../../components/pageWrapper";
import {Columns, Heading, Button} from "react-bulma-components";
import {MessageForm} from "../../components/messages/messageForms";
import {MessageList} from "../../components/messages/messageList";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import axios from "axios";

const RoomPage = ({showErrorMessage, showInfoMessage}) => {
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [socketState, setSocketState] = useState();
    const [temp, setTemp] = useState(undefined);
    const [loaded, setLoaded] = useState(false);

    const roomId = router.query['id'];

    useEffect( () => {
        (async () => {
            if(!loaded){
                try{
                    let response = await axios.get(`/api/messages/${roomId}`);
                    setMessages(response.data);
                }
                catch (e) {
                    showErrorMessage("Messages Not Get", e.response.data);
                    setMessages(undefined);
                }
                setLoaded(true);
            }
        })();
    }, [loaded]);

    useEffect(() => {
        if(temp !== undefined){
            setMessages([...messages, temp]);
        }
    }, [temp])

    useEffect(() => {
        const socket = new io("http://localhost:3000");
        setSocketState(socket);
        socket.on('sendMessage', data =>{
            setTemp(data);
        });
        return () => {
            socket.close();
        };
    }, [setSocketState]);

    

    return (
        <PageWrapper>
            <Columns.Column className="is-half is-offset-one-quarter case">
                <Columns>
                    <Columns.Column>
                        <Heading>Room</Heading>
                        <MessageForm socket={socketState} showErrorMessage={showErrorMessage}/>
                        <MessageList messages={messages}/>
                    </Columns.Column>
                </Columns><br></br>
                <Button onClick={() => {router.replace('/home')}} className="is-block is-danger is-fullwidth is-medium">Return HOME</Button>
            </Columns.Column>
        </PageWrapper>
    );
}

export default RoomPage;