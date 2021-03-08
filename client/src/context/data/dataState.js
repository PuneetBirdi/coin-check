import { useReducer } from 'react';
import axios from 'axios';
import DataContext from './dataContext';
import DataReducer from './dataReducer';
import {
    CONNECT_TO_SOCKET,
    HANDLE_FEED,
    GET_TICKER_DATA,
    SET_LOADING,
    SET_CONNECTION_STATUS
} from '../types';

//CONSTANTS
const SUBSCRIBE = {
  type: "subscribe",
  channels: [
    { name: "ticker", product_ids: ["BTC-USD"] },
    { name: "level2", product_ids: ["BTC-USD"] },
  ],
};

const WEBSOCKET_ADDRESS = "wss://ws-feed-public.sandbox.pro.coinbase.com";

const COINBASE_REST_API = "https://api.pro.coinbase.com/products/BTC-USD/candles?granularity=60"


const DataState = (props) =>{
    const initialState = {
        product: 'BTC-USD',
        tickerData = "",
        historicalData= "",
        level2Data= "",
        isConnected = false,
        isLoading = true
    }

    const [state, dispatch] = useReducer(DataReducer, initialState)

    
}