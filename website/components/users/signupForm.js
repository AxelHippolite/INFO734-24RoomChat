import {Button, Form} from "react-bulma-components";
import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export const SignupForm = ({showErrorMessage, showInfoMessage}) => { // Formulaire de Connexion
    const router = useRouter();
    const [connectionData, setConnectionData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const updateField = (e) => {
        setConnectionData({
            ...connectionData,
            [e.target.name]: e.target.value
        });
    }

    const singUpUser = async (event) => { // Fonction d'Inscription
        event.preventDefault();

        for (const key in connectionData) {
            if (connectionData[key] === '') {
                return showErrorMessage(`Empty Field`, "Try Again");
            }
        }

        try { // Essaie d'Inscription 
            const response = await axios.post('/api/user', {
                username: connectionData.username.trim(),
                password: connectionData.password.toString(),
                email: connectionData.email.toString()
            });
            showInfoMessage("Completed", "Account Created")
            router.replace("/");
        } catch (e) { // Si Erreur
            showErrorMessage("Error To Sign Up", e.response.data);
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
                    <Form.Input name="username" className="is-medium" type="username"
                                placeholder="Username" onKeyDown={handleKeyDown}
                                onChange={updateField} value={connectionData.username} autoComplete="username"/>
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Control>
                    <Form.Input name="email" className="is-medium" type="email"
                                placeholder="EMAIL" onKeyDown={handleKeyDown} onChange={updateField}
                                value={connectionData.email}/>
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Control>
                    <Form.Input name="password" className="is-medium" type="password"
                                placeholder="Password" onKeyDown={handleKeyDown} onChange={updateField}
                                value={connectionData.password} autoComplete="current-password"/>
                </Form.Control>
            </Form.Field><br></br>
            <Button onClick={singUpUser} className="is-block is-success is-fullwidth is-medium">Sign Up</Button>
        </form>
    )
}