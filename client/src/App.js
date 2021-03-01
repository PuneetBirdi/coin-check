import React, {useEffect, useRef, useState} from 'react'
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
  const [tickerData, setTickerData] = useState("");
  const [connectionStatus, setConnectionStatus] = useState(false)

  useEffect(() => {
        const subscribe = {
          type: "subscribe",
          channels: [{ name: "ticker", product_ids: ["BTC-USD"] }],
        };
        const ws = new WebSocket(
          "wss://ws-feed-public.sandbox.pro.coinbase.com"
        );

        ws.onopen = () => {
          ws.send(JSON.stringify(subscribe));
        };

        ws.onmessage = (e) => {
          setConnectionStatus(true)
          setTickerData(JSON.parse(e.data));
        };

        ws.onerror = (e) =>{
          setConnectionStatus(false)
        }
  }, [])

  return (
    <Router>
    <Div className="App">
      <Nav/>
      {
        connectionStatus ? 
      <Main>
        <GeneralInfo tickerData={tickerData}/>
        <OrderBook/>
        <News/>
      </Main>
      :
      <h2>No connection.</h2>
      }
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