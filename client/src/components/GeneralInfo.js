import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'
import {roundDecimals, formatMoney} from '../utils/formatData';
import DataContext from '../context/data/dataContext';
import LiveDataContext from '../context/liveData/liveDataContext';

import LineChart from './LineChart'

const GeneralInfo = () => {

  //Getting data from context and destructure it.
  const dataContext = useContext(DataContext)
  const liveDataContext = useContext(LiveDataContext)
  //Destructure data and functions from context
  const {loading, error, getHistorical} = dataContext;
  const {tickerData, isConnected, socketError, connectToSocket} = liveDataContext;

  //Destructure ticker data
  const {time, price, high_24h, low_24h, open_24h, volume_24h, volume_30d} = tickerData

  //Call for updated historical data and connect to the socket when the component is rendered
  useEffect(() => {
    getHistorical()
    connectToSocket()
  }, [])

    return (
      <GeneralInfoStyled>
        {
          !tickerData.price ?
            <h2>CONNECTING</h2>
          :
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

        }
        <ChartContainer>
          {
            !loading && !error ?
            <LineChart/>
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