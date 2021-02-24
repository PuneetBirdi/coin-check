import React from 'react'
import styled from 'styled-components'

const OrderBook = () => {
    return (
        <OrderBookStyled>
            <Heading>OrderBook</Heading>
        </OrderBookStyled>
    )
}

export default OrderBook

const OrderBookStyled = styled.section`
  grid-row-start: 1;
  grid-row-end: 3;
`;

const Heading = styled.h2`
    padding: 0;
    margin: 0;
    text-align: center;
    font-size: 1.0rem;
`
