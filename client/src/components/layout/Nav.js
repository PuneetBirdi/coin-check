import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Nav = () => {
    return (
        <Navigation>
            <Container>
                <BrandingContainer>
                    <p>Coin<AccentText>Check</AccentText></p>
                </BrandingContainer>
                <LinksContainer>
                    <li>
                        <Link to='/'>About</Link>
                    </li>
                </LinksContainer>
            </Container>
        </Navigation>
    )
}

export default Nav

const Navigation = styled.nav`
  padding: 1rem 0;
  display: flex;
  margin-bottom: 1.0rem;
  width: 100%;
`;
const Container = styled.div`
    width: 97%;
    margin: 0 auto;
    display: flex;
    align-items: center;
`
const BrandingContainer = styled.div`
    flex: 0;
`
const AccentText = styled.span`
    font-weight:600;
`
const LinksContainer = styled.ul`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    list-style: none;
    padding: 0;
    margin: 0;

    > li{
        margin: 0 1.0rem;
        transition: 0.1s;
        font-size: 0.75rem;
    }

    > li:hover{
        font-weight: bold;
    }
`