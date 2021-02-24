import React from 'react'
import styled from 'styled-components'

const OrderBook = () => {
    return (
        <OrderBookStyled>
            <p>OrderBook</p>
        </OrderBookStyled>
    )
}

export default OrderBook

const OrderBookStyled = styled.section`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background-color: white;
  padding: 1rem;
  border-radius: 0.25rem;
  grid-row-start: 1;
  grid-row-end: 3;
`;
