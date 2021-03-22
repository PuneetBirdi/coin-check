
export const roundDecimals = (value, decimals) =>{
    const number = parseFloat(value)
    return number.toFixed(decimals)
}

export const formatMoney = (value) =>{
    const number = parseFloat(value)
    const currency = "$" + number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return currency
}

export const formatChartData = (array) =>{
    const response = {
        candles: [],
        volume: []
    }
    array.forEach((entry) =>{
        //Create single candle object based on the array entry
        const candle = {
          time: entry[0],
          open: entry[3],
          high: entry[2],
          low: entry[1],
          close: entry[4],
        };
        const volumePoint = {
          time: entry[0],
          value: parseFloat(entry[5]),
        };
        response.volume.push(volumePoint)
        response.candles.push(candle)
    })
    return response;
}

// export const formatMarketDepth = (snapshot, update) =>{
//   //Initialize array for final orderbook to be pushed into.
//   const asks = [];
//   const bids = [];

//   //Loop through the array and create elements to show the total quantity, by accumulating all of the quantities of prices
//   let askAccumulator = 0;
//   let bidAccumulator = 0;

//   for (let i = 0; i < 100; i++) {
//     bidAccumulator += parseFloat(snapshot.bids[i][1]);
//     let numBid = [parseFloat(snapshot.bids[i][0]), bidAccumulator,];
//     bids.push(numBid);

//     askAccumulator += parseFloat(snapshot.asks[i][1]);
//     let numAsk = [parseFloat(snapshot.asks[i][0]), askAccumulator];
//     asks.push(numAsk);
//   }

//   //calculate mid-price
//   const midPrice =
//     (parseFloat(snapshot.bids[0][0]) + parseFloat(snapshot.asks[0][0])) / 2;

//   //Package response
//   const marketDepth = {
//     bids,
//     asks,
//     midPrice,
//   };

//   return marketDepth;
// }

export const calcPercentageChange = (initial, current) =>{
    const factor = current/initial;
    const percentage = (factor - 1) * 100;
    const change = {
        percentage: roundDecimals(percentage, 2),
        points: roundDecimals((current-initial), 2)
    }
    return change
}

//turn strings provided from order book into numbers
export const formatOrderBook = (book) =>{
  const asks = []
  const bids = []

  let askAccumulator = 0;
  let bidAccumulator = 0;

  for (let i = 0; i < 1000; i++) {
    const currentAsk = book.asks[i];
    askAccumulator += parseFloat(currentAsk[1])
    const askItem = [
      parseFloat(currentAsk[0]),
      askAccumulator,
      currentAsk[2]
    ]
    asks.push(askItem);

    const currentBid = book.bids[i];
    bidAccumulator += parseFloat(currentBid[1]);
    const bidItem = [
      parseFloat(currentBid[0]),
      bidAccumulator,
      currentBid[2]
    ]
    bids.push(bidItem)
  }

  const midPrice = (asks[0][0] + bids[0][0]) / 2
  const orderbook = {
    asks,
    bids,
    midPrice
  }

  return orderbook
}
