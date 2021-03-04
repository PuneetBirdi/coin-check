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