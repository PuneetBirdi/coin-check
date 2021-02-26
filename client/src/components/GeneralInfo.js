import React from 'react'
import styled from 'styled-components'

import LineChart from './LineChart'

const GeneralInfo = () => {
    return (
      <GeneralInfoStyled>
        <MainHeader>
          <PriceContainer>
            <small>BTC - USD</small>
            <Price>$45,345.23</Price>
            <small className='timestamp'>timestamp</small>
          </PriceContainer>
          <TableContainer>
            <Table>
              <tr>
                <Metric>Volume</Metric>
                <Value>325234.00</Value>
              </tr>
              <tr>
                <Metric>Volume</Metric>
                <Value>325234.00</Value>
              </tr>
              <tr>
                <Metric>Volume</Metric>
                <Value>325234.00</Value>
              </tr>
            </Table>
            <Table>
              <tr>
                <Metric>Volume</Metric>
                <Value>325234.00</Value>
              </tr>
              <tr>
                <Metric>Volume</Metric>
                <Value>325234.00</Value>
              </tr>
              <tr>
                <Metric>Volume</Metric>
                <Value>325234.00</Value>
              </tr>
            </Table>
          </TableContainer>
        </MainHeader>
        <ChartContainer>
          <LineChart/>
        </ChartContainer>
      </GeneralInfoStyled>
    );
}

export default GeneralInfo

const GeneralInfoStyled = styled.section`
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 3;
  padding: 1rem;

  display: flex;
  flex-direction: column;
`;

const MainHeader = styled.section`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`
const PriceContainer = styled.div`
    width: auto;

    > small{
        padding: 0;
        margin: 0;
        font-size: 0.75rem;
        display: block;
        width: 100%;
        text-align: right;
        color: gray;
    }

    > .timestamp{
        font-size: 0.5rem;
    }
`
const TableContainer = styled.div`
    width: auto;
    display: flex;
`
const Price = styled.h1`
    padding: 0;
    margin: 0;
    font-size: 2.0rem;
    font-weight: 900;
`
const ChartContainer = styled.section`
    flex: 1;

    >div{
      width: 100%;
      height: 100%;
    }
`
const Table = styled.table`
    font-size: 0.75rem;
    margin-left: 2.0rem;
`
const Metric = styled.td`
    padding-right: 2.5rem;
`
const Value = styled.td`
`