import React, {useContext} from 'react'
import styled from 'styled-components'
import DataContext from "../context/data/dataContext";
import LiveDataContext from "../context/liveData/liveDataContext";

const OrderBook = () => {
  //Getting data from context and destructure it.
  const liveDataContext = useContext(LiveDataContext);
  //Destructure data and functions from context
  const {
    tickerData,
    isConnected,
    socketError,
    connectToSocket,
    level2Snapshot,
    level2Update
  } = liveDataContext;
  return (
    <OrderBookStyled>
      <Heading>OrderBook</Heading>
    </OrderBookStyled>
  );
}

export default OrderBook

const OrderBookStyled = styled.section`
  grid-row-start: 1;
  grid-row-end: 4;
`;

const Heading = styled.h2`
    padding: 0;
    margin: 0;
    text-align: center;
    font-size: 1.0rem;
`
