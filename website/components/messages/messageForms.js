import {Button, Form} from "react-bulma-components";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export const MessageForm = ({socket, showErrorMessage}) => { // Formulaire de Message
    const router = useRouter();
    const roomName = router.query['name'];
    const roomCode = router.query['id'];
    const [message, setMessage] = useState("");

    const sendMessage = async (event) => { // Fonction d'Envoi
        event.preventDefault();

        if (message === '') {
            return showErrorMessage(`Empty Field`, "Try Again");
        }

        try { // Essaie d'Envoie
            let res = await axios.get("/api/session");
            const userData = res.data;
            const date = new Date();
            const createdAt = date.getHours().toString() + "H" + date.getMinutes().toString()
            socket.emit('sendMessage', {user: userData.username, message: message, room: roomName, date: createdAt});
            const response = await axios.post('/api/message', {
                content: message.toString(),
                userId: userData.userId.trim(),
                username: userData.username.trim(),
                roomName: roomName.trim(),
                roomCode: roomCode.trim(),
                createdAt: createdAt
            });
        } catch (e) { // Si Erreur
            showErrorMessage("Error To Send", e.response);
        }
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13 && event.shiftKey === false) {
            sendMessage(event);
        }
    }

    return (
        <form>
            <Form.Field>
                <Form.Control>
                    <Form.Input name="content" className="is-medium" type="text"
                                value={message}
                                placeholder="Message" onKeyDown={handleKeyDown}
                                onChange={e => {setMessage(e.target.value)}}/>
                </Form.Control>
            </Form.Field>

            <Button onClick={sendMessage} className="is-block is-danger is-fullwidth is-medium">SEND</Button>
        </form>
    )
}