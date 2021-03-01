import React from 'react'
import styled from 'styled-components'

const News = props => {
    return (
        <NewsStyled>
            <p>test</p>
        </NewsStyled>
    )
}


export default News

const NewsStyled = styled.section`
  grid-row-start: 3;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 3;
`;