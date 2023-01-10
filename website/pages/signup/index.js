import {PageWrapper} from "../../components/pageWrapper";
import {Columns, Heading} from "react-bulma-components";
import {SignupForm} from "../../components/users/signupForm";

const SignUpPage = ({showErrorMessage, showInfoMessage}) => {

    // Sinon on renvoie la page pour se connecter
    return (
        <PageWrapper>
            <Columns.Column className="is-half is-offset-one-quarter case">
                <Columns>
                    <Columns.Column>
                        <Heading>Sign Up</Heading>
                        <SignupForm showErrorMessage={showErrorMessage} showInfoMessage={showInfoMessage}/>
                    </Columns.Column>
                </Columns>
            </Columns.Column>
        </PageWrapper>
    );
}

export default SignUpPage;