 import { useReducer } from 'react';
 import axios from 'axios';
 import LiveDataContext from './liveDataContext';
 import LiveDataReducer from './liveDataReducer';
 import {
   CONNECT_TO_SOCKET,
   HANDLE_FEED,
   GET_HISTORICAL_DATA,
   SET_LOADING,
   SET_CONNECTION_STATUS,
   DATA_ERROR,
 } from "../types";
import e from 'express';

 //CONSTANTS
const SUBSCRIBE_MESSAGE = {
  type: "subscribe",
  channels: [
    { name: "ticker", product_ids: ["BTC-USD"] },
    { name: "level2", product_ids: ["BTC-USD"] },
  ],
};
const WEBSOCKET_ADDRESS = "wss://ws-feed-public.sandbox.pro.coinbase.com";

const liveDataState = (props) =>{
  const initialState = {
    product: "BTC-USD",
    tickerData: "",
    level2Data: "",
    isConnected: false,
    error: null,
  };

  const [state, dispatch] = useReducer(liveDataReducer, initialState);

  //Connect and handle messages from the socket
  const connectToSocket = (async = () => {
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
            //set the ticker data to the response
        }else if(response.type === 'snapshot'){
            //create initial order-book based on snapshot
        }else if(response.type === 'l2update'){
            //update the order book
        }
    };

    //If the socket send an error, set the connection to false and pass in error to state.
    ws.onerror = (e) =>{
        setConnectionStatus();
    }
  });

  //Set Loading
  const setConnectionStatus = () => {
    dispatch({ type: SET_CONNECTION_STATUS });
  };
}