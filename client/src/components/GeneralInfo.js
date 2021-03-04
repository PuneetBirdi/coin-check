import React, {useRef, useEffect} from 'react'
import styled from 'styled-components'
import { roundDecimals, formatMoney} from '../utils/formatData';

import LineChart from './LineChart'

const GeneralInfo = ({chartData, tickerData: {high_24h, low_24h, open_24h, price, volume_24h, volume_30d, time}}) => {
    return (
      <GeneralInfoStyled>
        <MainHeader>
          <PriceContainer>
            <small>BTC - USD</small>
            <h2>{formatMoney(price)}</h2>
            <small className="timestamp">
              {time}
            </small>
          </PriceContainer>
          <TableContainer>
            <Table>
              <tbody>
                <tr>
                  <td>Open</td>
                  <td>{formatMoney(open_24h)}</td>
                </tr>
                <tr>
                  <td>High</td>
                  <td>{formatMoney(high_24h)}</td>
                </tr>
                <tr>
                  <td>Low</td>
                  <td>{formatMoney(low_24h)}</td>
                </tr>
              </tbody>
            </Table>
            <Table>
              <tbody>
                <tr>
                  <td>Last</td>
                  <td>325234.00</td>
                </tr>
                <tr>
                  <td>Volume</td>
                  <td>{roundDecimals(volume_24h, 4)}</td>
                </tr>
                <tr>
                  <td>30 Day Volume</td>
                  <td>{roundDecimals(volume_30d, 4)}</td>
                </tr>
              </tbody>
            </Table>
          </TableContainer>
        </MainHeader>
        <ChartContainer>
          {
            chartData ?
            <LineChart chartData={chartData}/>
            :
            <h2>LOADING</h2>
          }
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

  > small {
    padding: 0;
    margin: 0;
    font-size: 0.75rem;
    display: block;
    width: 100%;
    text-align: right;
    color: gray;
  }

  > h2 {
    padding: 0;
    margin: 0;
    font-size: 2rem;
    font-weight: 900;
  }

  > .timestamp {
    font-size: 0.5rem;
  }
`;
const TableContainer = styled.div`
    width: auto;
    display: flex;
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