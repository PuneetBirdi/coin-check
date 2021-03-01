import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';


//Custom build components
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import GeneralInfo from './components/GeneralInfo';
import OrderBook from './components/OrderBook';
import News from './components/News';
//Styling
import styled from 'styled-components'

const App = () => {
  return (
    <Router>
    <Div className="App">
      <Nav/>
      <Main>
        <GeneralInfo/>
        <OrderBook/>
        <News/>
      </Main>
      <Footer/>
    </Div>
    </Router>
  );
}

export default App;

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
  width: 97%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 1rem;

  > section {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    padding: 1.5rem;
    border-radius: 0.25rem;
    background-color: white;
  }
`;