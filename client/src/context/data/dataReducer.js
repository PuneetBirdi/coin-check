import {
  GET_HISTORICAL_DATA,
  SET_LOADING,
  DATA_ERROR,
  GET_ORDER_BOOK,
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
        loadingNews: false,
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
