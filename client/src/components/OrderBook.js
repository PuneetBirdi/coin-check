import React, {useContext, Fragment} from 'react'
import styled from 'styled-components'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import LiveDataContext from "../context/liveData/liveDataContext";

const OrderBook = () => {
  //Getting data from context and destructure it.
  const liveDataContext = useContext(LiveDataContext);

  return (
    <OrderBookStyled>
      <Header>Market Depth - Under Cosntruction</Header>
      <ChartContainer>
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
