import {Container, Footer as FooterBulma, Level} from 'react-bulma-components'

export const Footer = () => { //Footer de l'Application
    return (
        <FooterBulma>
            <Container>
                <Level>
                    <Level.Item>
                        <small className="level-item has-text-success">
                            24Room Hippolite Axel &copy; 2022
                        </small>
                    </Level.Item>
                </Level>
            </Container>
        </FooterBulma>
    )
}