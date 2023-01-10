import {Button, Container, Message as BulmaMessage} from "react-bulma-components";
import {useEffect} from "react";

export const Message = ({message, tooltip, visible, hideMessage, type}) => {
    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                if (visible) {
                    hideMessage();
                }
            }, 5000)
        }
    })
    if (!visible) {
        return null;
    }

    return (
        <Container className="tp-message">
            <BulmaMessage color={type} style={{position: "absolute", width: "100%"}}>
                <BulmaMessage.Header>
                    <p>{message}</p>
                    <Button style={{backgroundColor: "rgba(10,10,10,.2)"}} onClick={() => hideMessage()} className="delete" aria-label="delete"/>
                </BulmaMessage.Header>
                <BulmaMessage.Body>
                    {tooltip}
                </BulmaMessage.Body>
            </BulmaMessage>
        </Container>
    )
}