import {Button, Form} from "react-bulma-components";
import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

function roomId(length){
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for(let i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const RoomsForms = ({showErrorMessage, showInfoMessage}) => { // Formulaire de Creation Room
    const router = useRouter();
    const [connectionData, setConnectionData] = useState({
        name: ""
    })
    const updateField = (e) => {
        setConnectionData({
            ...connectionData,
            [e.target.name]: e.target.value
        });
    }

    const createRoom = async (event) => { // Creation Room
        event.preventDefault();

        for (const key in connectionData) {
            if (connectionData[key] === '') {
                return showErrorMessage(`Empty Field`, "Try Again");
            }
        }

        try { // Essaie de Creation
            const response = await axios.post('/api/room', {
                name: connectionData.name.trim(),
                code: roomId(5)
            });
            router.replace("/home");
        } catch (e) { // Si Erreur
            showErrorMessage("Error To Create Room", e.response.data);
        }
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13 && event.shiftKey === false) {
            logUserIn(event);
        }
    }

    return (
        <form>
            <Form.Field>
                <Form.Control>
                    <Form.Input name="name" className="is-medium" type="name"
                                placeholder="Name" onKeyDown={handleKeyDown}
                                onChange={updateField} value={connectionData.name} autoComplete="name"/>
                </Form.Control>
            </Form.Field>

            <Button onClick={createRoom} className="is-block is-danger is-fullwidth is-medium">Create Room</Button>
        </form>
    )
}