import moment from 'moment'

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

export const formatMarketDepth = (snapshot, update) =>{
    //Initialize array for final orderbook to be pushed into.
    const asks = []
    const bids = []

    //Loop through the array and create elements to show the total quantity, by accumulating all of the quantities of prices
    let askAccumulator = 0
    let bidAccumulator = 0

    //Handle the asks and return a formatted object. 
    for (let i = 0; i < snapshot.asks.length; i++) {
        //Handle the asks
        const currentAsk = snapshot.asks[i];
        askAccumulator += parseFloat(currentAsk[1])
        const askItem = {
            price: parseFloat(currentAsk[0]),
            quantity: parseFloat(currentAsk[1]),
            totalQuantity: askAccumulator
        }
        asks.push(askItem)
    }

    //Handled the bids and return a formatted object.
    for (let i = 0; i < snapshot.bids.length; i++) {
        //Handle the bids
        const currentBid = snapshot.bids[i];
        bidAccumulator += parseFloat(currentBid[1]);
        const bidItem = {
        price: parseFloat(currentBid[0]),
        quantity: parseFloat(currentBid[1]),
        totalQuantity: bidAccumulator,
        };
        bids.push(bidItem);
    }
    

    //calculate mid-price
    const midPrice = (parseFloat(snapshot.bids[0][0]) + parseFloat(snapshot.asks[0][0])) /2

    //Package response
    const marketDepth = {
        bids,
        asks: asks.reverse(),
        askVolume: askAccumulator,
        bidVolume: bidAccumulator,
        midPrice
    }

    return marketDepth
}