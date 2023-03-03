import {Button, Form} from "react-bulma-components";
import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export const LoginForm = ({showErrorMessage, showInfoMessage}) => { // Formulaire de Connexion
    const router = useRouter();
    const [connectionData, setConnectionData] = useState({
        username: "",
        password: "",
    })
    const updateField = (e) => {
        setConnectionData({
            ...connectionData,
            [e.target.name]: e.target.value
        });
    }

    const logUserIn = async (event) => { // Fonction de Connexion
        event.preventDefault();

        for (const key in connectionData) {
            if (connectionData[key] === '') {
                return showErrorMessage(`Empty Field`, "Try Again");
            }
        }

        try { // Essaie de Connexion
            const response = await axios.post('/api/login', {
                username: connectionData.username.trim(),
                password: connectionData.password.toString()
            });
            router.replace("/home");
        } catch (e) { // Si Erreur
            showErrorMessage("Error To Log In", e.response.data);
        }
    }

    const toSignUp = async (event) => {
        router.replace("/signup");
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
                    <Form.Input name="username" className="is-medium" type="username"
                                placeholder="Username" onKeyDown={handleKeyDown}
                                onChange={updateField} value={connectionData.username} autoComplete="username"/>
                </Form.Control>
            </Form.Field>

            <Form.Field>
                <Form.Control>
                    <Form.Input name="password" className="is-medium" type="password"
                                placeholder="Password" onKeyDown={handleKeyDown} onChange={updateField}
                                value={connectionData.password} autoComplete="current-password"/>
                </Form.Control>
            </Form.Field>
            <Button onClick={logUserIn} className="is-block is-success is-fullwidth is-medium">Sign In</Button><br></br>
            <Button onClick={toSignUp} className="is-block is-success is-fullwidth is-medium">Sign Up</Button>
        </form>
    )
}