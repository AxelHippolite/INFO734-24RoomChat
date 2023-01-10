import {Columns, Container, Section} from "react-bulma-components";

export const PageWrapper = ({children}) => {
    return (
        <Section>
            <Container>
                <Columns className="is-multiline">
                    {children}
                </Columns>
            </Container>
        </Section>
    )
}