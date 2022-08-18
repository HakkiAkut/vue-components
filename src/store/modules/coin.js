const state = {
  coins: [],
};
const getters = {
  getCoins: (state) => state.coins,
};
const mutations = {
  setCoins: (state, coins) => {
    state.coins = coins;
  },
};
const actions = {
  fetchCoins: ({ commit }) => {
    let coins = [
      {
        tag: "BTC",
        name: "Bitcoin",
        trade: "USDT",
        icon: "https://bitcoin.org/img/icons/opengraph.png?1657703267",
      },
      {
        tag: "BTC",
        name: "Bitcoin",
        trade: "BUSD",
        icon: "https://bitcoin.org/img/icons/opengraph.png?1657703267",
      },
      {
        tag: "ETH",
        name: "Etherium",
        trade: "USDT",
        icon: "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png",
      },
      {
        tag: "ETH",
        name: "Etherium",
        trade: "BUSD",
        icon: "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png",
      },
      {
        tag: "BNB",
        name: "Binance coin",
        trade: "USDT",
        icon: "https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png",
      },
      {
        tag: "BNB",
        name: "Binance coin",
        trade: "BUSD",
        icon: "https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png",
      },
    ];
    commit("setCoins", coins);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
