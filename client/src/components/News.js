import React, { useContext } from 'react'
import styled from 'styled-components'
import NewsArticle from './NewsArticle'
import DataContext from "../context/data/dataContext";

const News = () => {
  //Getting data from context and destructure it.
  const dataContext = useContext(DataContext);
  const { news } = dataContext;
  return (
    <NewsStyled>
      <Header>
        <h2>News</h2>
        <p>Refresh</p>
      </Header>
      <ArticleContainer>
          {
              news ?
              news.map((article) =>{
                 return <NewsArticle article={article}/>
              }) 
              :
              <p>Loading</p>
          }
      </ArticleContainer>
    </NewsStyled>
  );
}


export default News

const NewsStyled = styled.section`
  grid-row-start: 3;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
    font-size: 0.75rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 0.25rem;
    >h2{
        margin: 0;
        padding: 0;
    }
`

const ArticleContainer = styled.div`
    flex: 1;
    display: flex;
    overflow-x: scroll;
`