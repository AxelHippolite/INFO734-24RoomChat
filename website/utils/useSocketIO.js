import {useEffect, useState} from 'react';
import SocketIOClient from "socket.io-client";

const useSocketIO = () => {
    const [message, setMessage] = useState(undefined);
    const [socketIO, setSocketIO] = useState(undefined);

    const onNewMessageReceived = (messageReceived) => {
        setMessage(JSON.stringify(messageReceived));
    }

    useEffect(() => {
        const socket = SocketIOClient(`/`);
        setSocketIO(socket);

        // Quand on reçoit un message de la part de la websocket, on veut exécuter la fonction onNewMessageReceived
        socket.on("message_recu", onNewMessageReceived);

        // On utilise cette syntax pour libérer le mémoire et fermer la Socket correctement
        return () => {
            if (socketIO !== undefined) {
                socketIO.close();
            }
        };
    }, []);

    return message;
}

export default useSocketIO;