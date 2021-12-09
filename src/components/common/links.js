const coinsApiHostURL = `https://api.coingecko.com/api/v3/coins/`;

class Links {
  static getTableDataURL(selectedCurrency, totalCurrencies) {
    return (
      coinsApiHostURL +
      `markets?vs_currency=${selectedCurrency}&order=market_cap_desc&per_page=${totalCurrencies}&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
    );
  }

  static getChartDataURL(selectedCoin, selectedCurrency, duration) {
    return (
      coinsApiHostURL +
      `${selectedCoin}/market_chart?&vs_currency=${selectedCurrency}&days=${duration}`
    );
  }
}

export default Links;
