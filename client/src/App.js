import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { formatChartData } from './utils/formatData'
import axios from 'axios';

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
  const [level2Data, setLevel2Data] = useState("");
  const [historicalData, setHistoricalData] = useState("")
  const [connectionStatus, setConnectionStatus] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(async () => {

  //Get historical price data from REST-API
    try {
      const res = await axios.get(
        "https://api.pro.coinbase.com/products/BTC-USD/candles?granularity=60"
      );

      const formattedData = await formatChartData(res.data)
      setHistoricalData(formattedData)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }

    
  //Connect and subscribe to the appropriate websocket channels.
    const subscribe = {
      type: "subscribe",
      channels: [
        { name: "ticker", product_ids: ["BTC-USD"] },
        { name: "level2", product_ids: ["BTC-USD"] },
      ],
    };
    const ws = new WebSocket(
      "wss://ws-feed-public.sandbox.pro.coinbase.com"
    );
    
    //Send subscription message
    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };

    //When message received, parse and push into the appropriate arrays depending on if it's ticker data, initial level2 data or a level2 data update.
    ws.onmessage = (e) => {
      setConnectionStatus(true)

      const response = (JSON.parse(e.data));

      if(response.type === "ticker"){
        setTickerData(response);
      }else if(response.type === 'snapshot'){
        setLevel2Data(response)
      }else if(response.type === 'l2update'){
        //do this.
      }
    };

    //If the socket receives and error, set connection status to false, so that an error can be displayed in the UI.
    ws.onerror = (e) =>{
      setConnectionStatus(false)
    }
  }, [])

  return (
    <Router>
    <Div className="App">
      <Nav/>
      {
        connectionStatus && !loading ? 
      <Main>
        <GeneralInfo tickerData={tickerData} chartData={historicalData}/>
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