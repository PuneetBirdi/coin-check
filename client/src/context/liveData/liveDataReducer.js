import {
  HANDLE_TICKER_DATA,
  HANDLE_LEVEL2_SNAPSHOT,
  SOCKET_ERROR,
  HANDLE_LEVEL2_UPDATE
} from "../types";

export default (state, action) =>{
    switch (action.type) {
      case HANDLE_TICKER_DATA:
        return {
          ...state,
          tickerData: action.payload,
          isConnected: true,
        };
      case HANDLE_LEVEL2_SNAPSHOT:
        return {
          ...state,
          level2Snapshot: action.payload,
          isConnected: true,
        };
      case HANDLE_LEVEL2_UPDATE:
        return {
          ...state,
          level2Update: action.payload.changes,
          isConnected: true,
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
