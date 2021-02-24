import React from 'react'

//Custom build components
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer'

//Styling
import styled from 'styled-components'

const App = () => {
  return (
    <Div className="App">
      <Nav/>
      <Main>
        <p>Test</p>
      </Main>
      <Footer/>
    </Div>
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
  background-color: blue;
  display: grid;
`