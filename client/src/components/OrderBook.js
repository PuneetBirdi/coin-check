import React, {useContext, useEffect, useRef} from 'react'
import { formatMoney } from '../utils/formatData';
import styled from 'styled-components'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import LiveDataContext from "../context/liveData/liveDataContext";

const OrderBook = () => {
  const chartComponent = useRef();
  //Getting data from context and destructure it.
  const liveDataContext = useContext(LiveDataContext);
  const { orderBook } = liveDataContext;
  const { midPrice } = orderBook

  useEffect(() => {
    const container = chartComponent.current.container.current;
    container.style.height = '100%';
    container.style.width = '100%';

    chartComponent.current.chart.reflow()
  }, [])
  const options = {
    chart: {
      type: "area",
    },
    title: {
      text: 'Market Depth',
    },
    xAxis: {
      minPadding: 0,
      maxPadding: 0,
      plotLines: [
        {
          color: "#888",
          value: midPrice,
          width: 1,
          label: {
            text: formatMoney(midPrice),
            rotation: 90,
          },
        },
      ],
      title: {
        text: "Price",
      },
    },
    yAxis: [
      {
        lineWidth: 1,
        gridLineWidth: 1,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: "inside",
        labels: {
          align: "left",
          x: 8,
        },
      },
      {
        opposite: true,
        linkedTo: 0,
        lineWidth: 1,
        gridLineWidth: 0,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: "inside",
        labels: {
          align: "right",
          x: -8,
        },
      },
    ],
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillOpacity: 0.2,
        lineWidth: 1,
        step: "center",
      },
    },
    tooltip: {
      headerFormat:
        '<span style="font-size=10px;">Price: {point.key}</span><br/>',
      valueDecimals: 2,
    },
    series: [
      {
        name: "Bids",
        data: orderBook.bids,
        color: "rgba(63, 191, 63, 0.5)",
      },
      {
        name: "Asks",
        data: orderBook.asks,
        color: "rgba(255, 20, 20, 0.5)",
      },
    ],
  };
  return (
    <OrderBookStyled>
          {
              orderBook === null ? 
              <p>Loading</p> 
              :
              <HighchartsReact ref={chartComponent} highcharts={Highcharts} options={options} />
          }
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

  max-height: 250px;
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
  width: 100%;

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
