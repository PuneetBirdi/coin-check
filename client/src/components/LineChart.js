import React, {useEffect, useContext, useRef} from 'react'
import DataContext from "../context/data/dataContext";
import { createChart } from "lightweight-charts";
import { formatMoney, roundDecimals } from '../utils/formatData'
import styled from 'styled-components';

const LineChart = () => {
const ref = useRef();
const legendRef = useRef();

//Use context to pull historical data and destructure
const dataContext = useContext(DataContext);
const { historicalData: {candles, volume} } = dataContext;

//Generate the chart on render.
useEffect(() => {

  //Initialize Chart
  const chart = createChart(ref.current, {
    width: ref.current.clientWidth,
    height: ref.current.clientHeight,
  });

  //Apply chart styling and custom options:
  chart.applyOptions({
    grid: {
      vertLines: {
        color: "rgba(70, 130, 180, 0.5)",
        style: 1,
        visible: true,
      },
      horzLines: {
        color: "rgba(70, 130, 180, 0.5)",
        style: 1,
        visible: true,
      },
    },
    timeScale:{
      timeVisible: true
    }
  });

  //Set chart to candlestick type.
  const candlestickSeries = chart.addCandlestickSeries({
    upColor: "rgba(63, 191, 63, 0.5)",
    downColor: "rgba(255, 20, 20, 0.5)",
    borderVisible: true,
    wickVisible: true,
    borderUpColor: "rgba(63, 191, 63, 1)",
    borderDownColor: "rgba(255, 20, 20, 1)",
    wickUpColor: "rgba(63, 191, 63, 1)",
    wickDownColor: "rgba(255, 20, 20, 1)",
  });

  //Initialize volume bar histogram
  const volumeSeries = chart.addHistogramSeries({
    priceFormat: {
      type: "volume",
    },
    priceScaleId: "",
    scaleMargins: {
      top: 0.8,
      bottom: 0,
    },
  });

  volumeSeries.applyOptions({
    rightPriceScale:{
      visible: false
    }
  })

  // set sample data
  candlestickSeries.setData(candles.reverse());
  volumeSeries.setData(volume.reverse());

  //Handling the legend to update whenever the crosshair has changes
  chart.subscribeCrosshairMove((param) => {
    let volume = null
    let prices = {}
    //Check if there is a timestamp, at the crosshair position, load the values at this position into the appropriate variable.
    if (param.time) {
      //Candlesticks return a Map for prices, so iterate through the map and push them into the prices object initialized above.
      const iterator = param.seriesPrices.values()
      prices = iterator.next().value
      volume = iterator.next().value

      legendRef.current.textContent = `High: ${formatMoney(prices.high)} | Low: ${formatMoney(prices.low)} | Open: ${formatMoney(prices.open)} | Close: ${formatMoney(prices.close)} | Volume: ${roundDecimals(volume, 4)}`;
    } else {
      legendRef.current.textContent = 'BTC - USD'
    }
  });
}, []);


return (
  <>
    <div ref={ref} styling={{ position: "relative" }}>
      <Legend>
        <p ref={legendRef}>BTC - USD</p>
      </Legend>
    </div>
  </>
);
}


export default LineChart

const Legend = styled.div`
  left: 12px;
  top: 12px;
  z-index: 1;
  font-size: 12px;
  line-height: 18px;
  font-weight: 300;
  display: flex;
  justify-content: space-between; 

  >p{
    font-size: 0.66rem;
  }
`;

