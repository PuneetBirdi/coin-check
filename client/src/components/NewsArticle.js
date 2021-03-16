import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const NewsArticle = ({article: {title, description, url, urlToImage}}) => {
    return (
        <StyledNewsArticle>
            <img src={urlToImage} alt=""/>
            <a href={url}>
                <h3>{title}</h3>
            </a>
            <p>{description}</p>
        </StyledNewsArticle>
    )
}

export default NewsArticle

const StyledNewsArticle = styled.section`
    max-width: 300px;
    min-width: 300px;
    max-height: 100%;
    padding: 0.5rem; 
    border-right: 1px solid lightgray;
    
    img{
        max-width: 100%;
        height: auto;
    }
    h3{
        font-size: 0.75rem;
        padding: 0;
        margin: 0.5rem 0;
    }
    >p{
        font-size: 0.75rem;
    }


`