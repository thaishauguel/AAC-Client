const axios = require("axios");

function EthToDollars(value) {
  return axios
    .get(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"
    )
    .then((res) => {
      return (res.data.USD * value).toFixed();
    })
    .catch((err) => console.log(err));
}

export default EthToDollars

