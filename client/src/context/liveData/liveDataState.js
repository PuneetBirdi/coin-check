 import { useReducer } from 'react';
 import { calcPercentageChange, formatOrderBook } from '../../utils/formatData';
 import LiveDataContext from './liveDataContext';
 import LiveDataReducer from './liveDataReducer';
 import axios from 'axios';
 import {

   HANDLE_TICKER_DATA,
   SET_CONNECTION_STATUS,
   HANDLE_LEVEL2_UPDATE,
   HANDLE_LEVEL2_SNAPSHOT,
   GET_ORDER_BOOK
 } from "../types";

 //CONSTANTS
const SUBSCRIBE_MESSAGE = {
  type: "subscribe",
  channels: [
    { name: "ticker", product_ids: ["BTC-USD"] },
  ],
};
const WEBSOCKET_ADDRESS = "wss://ws-feed-public.sandbox.pro.coinbase.com";
const COINBASE_REST_API = "https://api.pro.coinbase.com";

const LiveDataState = (props) =>{
  const initialState = {
    product: "BTC-USD",
    tickerData: {},
    marketDepth: {
      bids:null,
      asks: null,
      midPrice: null,
    },
    isConnected: false,
    error: null,
    orderBook: ""
  };

  const [state, dispatch] = useReducer(LiveDataReducer, initialState);

  //Connect and handle messages from the socket
  const connectToSocket = async () => {
    getOrderBook();
    //Initiate socket
    const ws = new WebSocket(WEBSOCKET_ADDRESS);

    //Send subscription message
    ws.onopen = () => {
      ws.send(JSON.stringify(SUBSCRIBE_MESSAGE));
    };

    //When a message is received, handle the data received depending on if it's ticker data, or level2 data.
    ws.onmessage = async (message) => {
        const response = (JSON.parse(message.data))

        if(response.type === 'ticker'){
          const tickerData = {
            price: response.price,
            open_24h: response.open_24h,
            volume_24h: response.volume_24h,
            low_24h: response.low_24h,
            high_24h: response.high_24h,
            volume_30d: response.volume_30d,
            side: response.side,
            time: response.time,
            change_24h: calcPercentageChange(response.open_24h, response.price)
          }
            dispatch({
              type: HANDLE_TICKER_DATA,
              payload: tickerData
            })
        }else if(response.type === 'snapshot'){
          // console.log(response)
          //   dispatch({
          //     type: HANDLE_LEVEL2_SNAPSHOT,
          //     payload: await formatMarketDepth(response, null)
          //   })
        }else if(response.type === 'l2update'){
            dispatch({
              type: HANDLE_LEVEL2_UPDATE,
              payload: response
            })
        }
    };

    //If the socket send an error, set the connection to false and pass in error to state.
    ws.onerror = (error) =>{
        setConnectionStatus()
    }
  }

  const getOrderBook = async (product) => {
    try {
      const res = await axios.get(
        `${COINBASE_REST_API}/products/BTC-USD/book?level=3`
      );
      dispatch({
        type: GET_ORDER_BOOK,
        payload: await formatOrderBook(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  };

  //Set Loading
  const setConnectionStatus = () => {
    dispatch({ type: SET_CONNECTION_STATUS });
  };

    return (
        <LiveDataContext.Provider
            value={{
            tickerData: state.tickerData,
            socketError: state.error,
            isConnected: state.isConnected,
            orderBook: state.orderBook,
            connectToSocket,
            }}
        >
            {props.children}
        </LiveDataContext.Provider>
    );
}

export default LiveDataState;