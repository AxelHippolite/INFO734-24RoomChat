import {Columns, Heading, Section} from "react-bulma-components";
import {LoginForm} from "../components/users/loginForm";

// La page de l'index, c'est à dire le '/'
const IndexPage = ({showErrorMessage, showInfoMessage}) => {
  return (
    <Section>
      <Heading>24Room</Heading>
      <Columns>
        <Columns.Column className="is-half has-background-danger">
          <Heading className="has-text-white">Discover the World. But only for 24 Hours.</Heading>
        </Columns.Column>
        <Columns.Column className="is- half tp-notification">
          <Heading className="is-3">Join 24Room</Heading>
          <LoginForm showErrorMessage={showErrorMessage} showInfoMessage={showInfoMessage}/>
        </Columns.Column>
      </Columns>
    </Section>
  )
}

// On exporte la page
export default IndexPage;