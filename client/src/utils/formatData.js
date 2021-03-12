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
          value: parseInt(entry[5]),
        };
        response.volume.push(volumePoint)
        response.candles.push(candle)
    })

    return response;
}

export const formatMarketDepth = (snapshot, update) =>{
    //Cut the response down to just the first 100 asks and bids. The response is already in order of price.
    const asks = snapshot.asks.slice(0, 100)
    const bids = snapshot.bids.slice(0, 100)
    

    //Initialize array for final orderbook to be pushed into.
    const orderBook = []

    //Loop through the array and create elements to show the total quantity, by accumulating all of the quantities of prices
    let accumulator = 0
    for (let i = 0; i < asks.length; i++) {
        const current = asks[i];
        accumulator += parseFloat(current[1])

        const bookItem = {
            price: parseFloat(current[0]),
            quantity: parseFloat(current[1]),
            totalQuantity: accumulator
        }
        orderBook.push(bookItem)
    }
    console.log(orderBook, bids)
}