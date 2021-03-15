import React, {useContext, Fragment} from 'react'
import styled from 'styled-components'
import DataContext from "../context/data/dataContext";
import {roundDecimals, formatMoney} from '../utils/formatData';
import LiveDataContext from "../context/liveData/liveDataContext";

const OrderBook = () => {
  //Getting data from context and destructure it.
  const liveDataContext = useContext(LiveDataContext);
  //Destructure data and functions from context
  const {
    tickerData:{price},
    isConnected,
    socketError,
    connectToSocket,
    marketDepth,
    level2Update
  } = liveDataContext;

  let { bids, asks } = marketDepth;
  return (
    <OrderBookStyled>
      <Heading>OrderBook</Heading>
      {bids ? (
        <Fragment>
          <OrderContainer>
            {bids.reverse().map((bid) => {
              return <PriceItem>{formatMoney(bid.price)}</PriceItem>;
            })}
          </OrderContainer>
          <MidPriceContainer>{formatMoney(price)}</MidPriceContainer>
          <OrderContainer>
            {asks.reverse().map((ask) => {
              return <PriceItem>{formatMoney(ask.price)}</PriceItem>;
            })}
          </OrderContainer>
        </Fragment>
      ) : (
        <p>loading</p>
      )}
    </OrderBookStyled>
  );
}

export default OrderBook

const OrderBookStyled = styled.section`
  grid-row-start: 1;
  grid-row-end: 4;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 1.0rem;
`
const MidPriceContainer = styled.section`
  padding: 0.5rem;
  text-align: center;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`
const OrderContainer = styled.section`
  flex: 1;
  overflow-y: scroll;
  padding: 0.25rem;
  margin: 0.25rem;
`

const PriceItem = styled.p`
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`