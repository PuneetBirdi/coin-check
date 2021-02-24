import React from 'react'
import styled from 'styled-components'

const Nav = () => {
    return (
        <Navigation>
            <div className="branding">BRANDING</div>
            <div className="links">
                Links
            </div>
        </Navigation>
    )
}

export default Nav

const Navigation = styled.nav`
    padding: 1rem 0;
    background-color: purple;
    display: flex;
    margin: 0;
    width: 100%;
`