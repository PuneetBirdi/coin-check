import React, {useContext, useState, useEffect} from 'react'
import styled from 'styled-components'
import {roundDecimals, formatMoney, calcPercentageChange} from '../utils/formatData';
import DataContext from '../context/data/dataContext';
import LiveDataContext from '../context/liveData/liveDataContext';

import LineChart from './LineChart'

const GeneralInfo = () => {
  const [range, setRange] = useState(60)
  //Getting data from context and destructure it.
  const dataContext = useContext(DataContext)
  const liveDataContext = useContext(LiveDataContext)
  //Destructure data and functions from context
  const {loading, error, getHistorical} = dataContext;
  const {tickerData, isConnected, socketError, connectToSocket} = liveDataContext;

  //Destructure ticker data
  const {change_24h, time, price, high_24h, low_24h, open_24h, volume_24h, volume_30d} = tickerData

  //Call for updated historical data and connect to the socket when the component is rendered
  useEffect(() => {
    getHistorical(range)
    connectToSocket()
  }, [])

  const changeRange = (e) => {
    setRange(e.target.value)
    getHistorical(e.target.value);
  };
    return (
      <GeneralInfoStyled>
        {!tickerData.price ? (
          <MainHeader>
            <PriceContainer>
              <small>BTC - USD</small>
              <h2>Connecting...</h2>
              <small className="timestamp">...</small>
            </PriceContainer>
            <TableContainer>
              <Table>
                <tbody>
                  <tr>
                    <td>Open</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>High</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Low</td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
              <Table>
                <tbody>
                  <tr>
                    <td>Last</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Volume</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>30 Day Volume</td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </TableContainer>
          </MainHeader>
        ) : (
          <MainHeader>
            <PriceContainer>
              <div className="current-price">
                <small>BTC - USD</small>
                <h2>{formatMoney(price)}</h2>
                <small className="timestamp">{time}</small>
              </div>
              <div className="price-change">
                <small>24 Hour Change</small>
                <h2>{formatMoney(change_24h.points)}</h2>
                <small className="timestamp">{`${change_24h.percentage}%`}</small>
              </div>
            </PriceContainer>
            <TableContainer>
              <Table>
                <tbody>
                  <tr>
                    <td className="table-heading">Open</td>
                    <td className="table-value">{formatMoney(open_24h)}</td>
                  </tr>
                  <tr>
                    <td className="table-heading">High</td>
                    <td className="table-value">{formatMoney(high_24h)}</td>
                  </tr>
                  <tr>
                    <td className="table-heading">Low</td>
                    <td className="table-value">{formatMoney(low_24h)}</td>
                  </tr>
                </tbody>
              </Table>
              <Table>
                <tbody>
                  <tr>
                    <td className="table-heading">Last</td>
                    <td className="table-value">{formatMoney(price)}</td>
                  </tr>
                  <tr>
                    <td className="table-heading">Volume</td>
                    <td className="table-value">
                      {roundDecimals(volume_24h, 4)}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-heading">30d Volume</td>
                    <td className="table-value">
                      {roundDecimals(volume_30d, 4)}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </TableContainer>
            <Switcher>
              <p>Candle Duration</p>
              <select
                value={range}
                name="range"
                id="range"
                onChange={changeRange}
              >
                <option value={60}>1 Min</option>
                <option value={300}>5 Min</option>
                <option value={900}>15 Min</option>
                <option value={3600}>1 Hour</option>
                <option value={21600}>6 Hours</option>
                <option value={86400}>1 Day</option>
              </select>
            </Switcher>
          </MainHeader>
        )}
        <ChartContainer>
          {!loading && !error ? <LineChart /> : <h2>LOADING</h2>}
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
  display: flex;

  .current-price {
    margin-right: 1.0rem;
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
  }

  .price-change {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: green;

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
      font-size: 1.0rem;
      font-weight: 900;
      text-align: right;
    }

    > .timestamp {
      font-size: 0.5rem;
      color: green;
      font-weight: 600;
      font-size: 0.75rem;
    }
  }
`;
const TableContainer = styled.div`
    width: auto;
    display: flex;
    margin-right: 2.0rem;
    justify-content: flex-end;
    flex: 1;
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
  margin-left: 2rem;

  >tbody>tr{
    border-bottom: 1px solid gray;
  }

  > tbody .table-heading {
    padding-right: 1.5rem;
  }
  > tbody .table-value {
    text-align: right;
  }
`;

const Switcher = styled.div`
    p{
      font-size: 0.75rem;
    }
    select{
      width: 100%;
    }
`;