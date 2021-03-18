import React, {useContext, Fragment} from 'react'
import styled from 'styled-components'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import LiveDataContext from "../context/liveData/liveDataContext";

const OrderBook = () => {
  //Getting data from context and destructure it.
  const liveDataContext = useContext(LiveDataContext);
  //Destructure data and functions from context
  const {
    marketDepth,
  } = liveDataContext;
  const{ bids, asks } = marketDepth;
  const options = {
chart: {
        type: 'area',
        zoomType: 'xy'
    },
    xAxis: {
        minPadding: 0,
        maxPadding: 0,
        plotLines: [{
            color: '#888',
            value: 0.1523,
            width: 1,
            label: {
                text: 'Test',
                rotation: 90
            }
        }],
        title: {
            text: 'Price'
        }
    },
    yAxis: [{
        lineWidth: 1,
        gridLineWidth: 1,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: 'inside',
        labels: {
            align: 'left',
            x: 8
        }
    }, {
        opposite: true,
        linkedTo: 0,
        lineWidth: 1,
        gridLineWidth: 0,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: 'inside',
        labels: {
            align: 'right',
            x: -8
        }
    }],
    legend: {
        enabled: false
    },
    plotOptions: {
        area: {
            fillOpacity: 0.2,
            lineWidth: 1,
            step: 'center'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
        valueDecimals: 2
    },
    series: [{
        name: 'Bids',
        data: bids,
        color: '#03a7a8'
    }, {
        name: 'Asks',
        data: asks,
        color: '#fc5857'
    }]
}


  return (
    <OrderBookStyled>
      <Header>Market Depth</Header>
      <ChartContainer>
        <HighchartsReact highcharts={Highcharts} options={options} />
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
