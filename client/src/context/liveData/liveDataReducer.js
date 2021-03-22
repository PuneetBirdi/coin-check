import {
  HANDLE_TICKER_DATA,
  SOCKET_ERROR,
  GET_ORDER_BOOK,
  HANDLE_LEVEL2_UPDATE,
  SET_ORDER_BOOK_LOADING
} from "../types";

export default (state, action) =>{
    switch (action.type) {
      case HANDLE_TICKER_DATA:
        return {
          ...state,
          tickerData: action.payload,
          isConnected: true,
        };
      case GET_ORDER_BOOK:
        return {
          ...state,
          orderBook: action.payload,
          orderBookLoading: false
        };
      case HANDLE_LEVEL2_UPDATE:
        return {
          ...state,
          level2Update: action.payload.changes,
          isConnected: true,
        };
      case SET_ORDER_BOOK_LOADING:
        return {
          ...state,
          orderBookLoading: true,
        };
      case SOCKET_ERROR:
        return {
          ...state,
          isConnected: false,
          error: action.payload,
        };
      default:
        return state;
    }
}
