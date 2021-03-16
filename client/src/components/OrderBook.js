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

  let { bids, asks, midPrice } = marketDepth;

  return (
    <OrderBookStyled>
      <Header>OrderBook</Header>
      {bids ? (
        <Fragment>
          <OrderContainer>
            <table style={{ width: "100%", borderSpacing: "0" }}>
              {asks.map((bid) => {
                return (
                  <tr
                    style={{
                      backgroundColor: "rgba(234, 0, 0, 0.30)",
                    }}
                  >
                    <td
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: "bold",
                        borderLeft: "3px solid red",
                        paddingRight: "0.5rem",
                        textAlign: "right",
                        width: "50%"
                      }}
                    >
                      {formatMoney(bid.price)}
                    </td>
                    <td
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: "600",
                        borderRight: "3px solid red",
                        paddingLeft: "0.5rem",
                        textAlign: "left",
                      }}
                    >
                      {roundDecimals(bid.quantity, 6)}
                    </td>
                  </tr>
                );
              })}
            </table>
          </OrderContainer>
          <MidPriceContainer>Mid: {formatMoney(midPrice)}</MidPriceContainer>
          <OrderContainer>
            <table
              style={{ width: "100%", borderSpacing: "0" }}
            >
              {bids.map((bid) => {
                return (
                  <tr
                    style={{
                      backgroundColor: "lightgreen",
                    }}
                  >
                    <td
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: "bold",
                        borderLeft: "3px solid green",
                        paddingRight: "0.5rem",
                        textAlign: "right",
                        width: '50%'
                      }}
                    >
                      {formatMoney(bid.price)}
                    </td>
                    <td
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: "bold",
                        borderRight: "3px solid green",
                        paddingLeft: "0.5rem",
                        textAlign: "left",
                        fontWeight: "500",
                      }}
                    >
                      {roundDecimals(bid.quantity, 6)}
                    </td>
                  </tr>
                );
              })}
            </table>
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

const Header = styled.h2`
  padding: 0;
  margin: 0;
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 1.0rem;
`
const MidPriceContainer = styled.section`
  padding: 0.5rem;
  text-align: center;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  font-weight: bold;
`

const OrderContainer = styled.div`
  overflow-y: scroll;
  max-height: 50%;
`