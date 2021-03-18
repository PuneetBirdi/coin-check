import React, {useContext, Fragment} from 'react'
import styled from 'styled-components'
import {roundDecimals, formatMoney} from '../utils/formatData';
import LiveDataContext from "../context/liveData/liveDataContext";

const OrderBook = () => {
  //Getting data from context and destructure it.
  const liveDataContext = useContext(LiveDataContext);
  //Destructure data and functions from context
  const {
    marketDepth,
  } = liveDataContext;

  let { bids, asks, midPrice } = marketDepth;

  return (
    <OrderBookStyled>
      <Header>Market Depth</Header>
      <ChartContainer>
        <section>Chart</section>
        <div className='mid-price'>
          <small>Mid</small>
          <p>$44,232.22</p>
        </div>
        <section>Chart</section>
      </ChartContainer>
    </OrderBookStyled>
  );
}

export default OrderBook

const OrderBookStyled = styled.section`
  grid-row-start: 3;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h2`
  padding: 0;
  margin: 0;
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 1.0rem;
  text-align: center;
`

const ChartContainer = styled.div`
  display: flex;
  height: 100%;

  > .mid-price{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  >section{
    flex: 1;
    display: flex;
    align-content: center;
    justify-content: center;
  }
`
