import React from 'react'
import styled from 'styled-components'
const Footer = () => {
    return (
        <StyledFooter>
            <p>Created By Me.</p>
        </StyledFooter>
    )
}

export default Footer

const StyledFooter = styled.footer`
    padding: 0.33rem 0;
    display: flex;
    align-content: center;
    justify-content: center;
    font-size: 0.75rem;
    background-color: green;
`