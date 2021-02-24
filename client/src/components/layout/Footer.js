import React from 'react'
import styled from 'styled-components'
const Footer = () => {
    return (
        <StyledFooter>
            <FooterText>Created By Me.</FooterText>
        </StyledFooter>
    )
}

export default Footer

const StyledFooter = styled.footer`
    padding: 0.33rem 0;
    display: flex;
    align-content: center;
    justify-content: center;
    margin-top: 1rem;
`

const FooterText = styled.small`
  font-size: 0.75rem;
  display: inline;
  width: 75%;
  text-align: center;
  border-top: 1px solid lightgray;
`;