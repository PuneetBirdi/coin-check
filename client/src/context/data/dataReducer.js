import {
  CONNECT_TO_SOCKET,
  HANDLE_FEED,
  GET_HISTORICAL_DATA,
  SET_LOADING,
  SET_CONNECTION_STATUS,
  DATA_ERROR,
  GET_NEWS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_HISTORICAL_DATA:
      return {
        ...state,
        historicalData: action.payload,
        loading: false,
      };
    case DATA_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_NEWS:
      return{
        ...state,
        news: action.payload,
        loading: false,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
