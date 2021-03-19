import React from 'react'
import styled from 'styled-components'


const NewsArticle = ({article: {source, title, description, url, urlToImage}}) => {
    return (
        <StyledNewsArticle>
            <p className='news-source'>{source.name}</p>
            <a href={url}>
                <h3>{title}</h3>
            </a>
            <p>{description}</p>
        </StyledNewsArticle>
    )
}

export default NewsArticle

const StyledNewsArticle = styled.section`
    max-width: 90%;
    padding: 1rem 0.5rem; 
    border-bottom: 1px solid lightgray;

    img{
        max-width: 100%;
        height: auto;
    }
    h3{
        font-size: 0.75rem;
        padding: 0;
        margin: 0.5rem 0;
    }

    a:hover{
        text-decoration: underline
    }
    >p{
        font-size: 0.75rem;
    }

    .news-source{
        color: gray;
    }


`