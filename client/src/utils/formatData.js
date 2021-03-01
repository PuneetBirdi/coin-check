export const roundDecimals = (value, decimals) =>{

}

export const formatMoney = (value) =>{
    const currency = "$" + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return currency
}