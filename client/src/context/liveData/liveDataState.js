 import { useReducer } from 'react';
 import axios from 'axios';
 import LiveDataContext from './liveDataContext';
 import LiveDataReducer from './liveDataReducer';
 import {

   HANDLE_TICKER_DATA,
   SET_CONNECTION_STATUS,
   HANDLE_LEVEL2_UPDATE,
   HANDLE_LEVEL2_SNAPSHOT,
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
    tickerData: {},
    level2Snapshot: {},
    level2Update: {},
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
            dispatch({
              type: HANDLE_LEVEL2_SNAPSHOT,
              payload: response
            })
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
            level2Snapshot: state.level2Snapshot,
            level2Update: state.level2Update,
            connectToSocket,
            }}
        >
            {props.children}
        </LiveDataContext.Provider>
    );
}

export default LiveDataState;