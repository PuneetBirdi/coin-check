import { useReducer } from 'react';
import axios from 'axios';
import DataContext from './dataContext';
import DataReducer from './dataReducer';
import {
    CONNECT_TO_SOCKET,
    HANDLE_FEED,
    GET_HISTORICAL_DATA,
    SET_LOADING,
    SET_CONNECTION_STATUS,
    DATA_ERROR,
    GET_NEWS
} from '../types';
import {formatChartData} from '../../utils/formatData';

//CONSTANTS
const SUBSCRIBE = {
  type: "subscribe",
  channels: [
    { name: "ticker", product_ids: ["BTC-USD"] },
    { name: "level2", product_ids: ["BTC-USD"] },
  ],
};
const WEBSOCKET_ADDRESS = "wss://ws-feed-public.sandbox.pro.coinbase.com";
const COINBASE_REST_API = "https://api.pro.coinbase.com";
const NEWS_REST_API =
  "https://newsapi.org/v2/everything?q=bitcoin&apiKey=83a24ad5547d4a6d97a6406fb2b9a55e";


const DataState = (props) =>{
    const initialState = {
        product: 'BTC-USD',
        historicalData: "",
        news: null,
        error: null,
        loading: true
    }

    const [state, dispatch] = useReducer(DataReducer, initialState)


    //Initial REST-API call for historical data
    const getHistorical = async (product) =>{
        getNews();
        setLoading();
        //Make API request based on parameters that were passed in.
        try {
            const res = await axios.get(
                `${COINBASE_REST_API}/products/BTC-USD/candles?granularity=60`
            );

            //Format response to appropriately fit charts
            const formattedData = await formatChartData(res.data)

            //write the formatted data to the context
            dispatch({
                type: GET_HISTORICAL_DATA,
                payload: formattedData
            })
        } catch (error) {
            dispatch({
                type: DATA_ERROR,
                payload: error.response.data.message
            })
        }
    }

    //Get news articles
    const getNews = async (product) =>{
      try {
        const res = await axios.get(NEWS_REST_API)
        
        dispatch({
          type: GET_NEWS,
          payload: res.data.articles
        })

      } catch (error) {
        
      }
    }

    //Set Loading
    const setLoading = () => {
        dispatch({ type: SET_LOADING });
    };

    return (
    <DataContext.Provider
      value={{
        historicalData: state.historicalData,
        error: state.error,
        loading: state.loading,
        news: state.news,
        getHistorical
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}


export default DataState;