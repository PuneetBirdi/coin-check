 import { useReducer } from 'react';
 import axios from 'axios';
 import LiveDataContext from './liveDataContext';
 import LiveDataReducer from './liveDataReducer';
 import {
   CONNECT_TO_SOCKET,
   HANDLE_TICKER_DATA,
   GET_HISTORICAL_DATA,
   SET_LOADING,
   SET_CONNECTION_STATUS,
   DATA_ERROR,
 } from "../types";

 //CONSTANTS
const SUBSCRIBE_MESSAGE = {
  type: "subscribe",
  channels: [
    { name: "ticker", product_ids: ["BTC-USD"] },
    { name: "level2", product_ids: ["BTC-USD"] },
  ],
};
const WEBSOCKET_ADDRESS = "wss://ws-feed-public.sandbox.pro.coinbase.com";

const LiveDataState = (props) =>{
  const initialState = {
    product: "BTC-USD",
    tickerData: "",
    level2Data: "",
    isConnected: false,
    error: null,
  };

  const [state, dispatch] = useReducer(LiveDataReducer, initialState);

  //Connect and handle messages from the socket
  const connectToSocket = async () => {
    //Initiate socket
    const ws = new WebSocket(WEBSOCKET_ADDRESS);

    //Send subscription message
    ws.onopen = () => {
      ws.send(JSON.stringify(SUBSCRIBE_MESSAGE));
    };

    //When a message is received, handle the data received depending on if it's ticker data, or level2 data.
    ws.onmessage = (message) => {
        const response = (JSON.parse(message.data))

        if(response.type === 'ticker'){
            dispatch({
              type: HANDLE_TICKER_DATA,
              payload: response
            })
        }else if(response.type === 'snapshot'){
            //create initial order-book based on snapshot
        }else if(response.type === 'l2update'){
            //update the order book
        }
    };

    //If the socket send an error, set the connection to false and pass in error to state.
    ws.onerror = (error) =>{
        setConnectionStatus()
    }
  }

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
            level2Data: state.level2Data,
            connectToSocket,
            }}
        >
            {props.children}
        </LiveDataContext.Provider>
    );
}

export default LiveDataState;