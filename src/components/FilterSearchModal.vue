<template>
  <div class="modal column">
    <div class="filter column">
      <div class="btn-list row">
        <button
          class="btn-list__item"
          v-for="item in categories"
          :class="{ 'btn-list__item--selected': selected == item }"
          :key="item"
          @click="changeCategory(item)"
        >
          <svg
            class="svg-heart"
            v-if="item == 'Favorites'"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            ></path>
          </svg>
          <p v-else>{{ item }}</p>
        </button>
      </div>
      <div class="search row">
        <svg
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          class="search__bar"
          type="text"
          placeholder="Search ETH, BTC, ..."
          v-model="search"
        />
      </div>
    </div>
    <div class="coin-list column">
      <div
        v-for="coin in coins"
        :key="coinKey(coin)"
        class="coin-list__item"
        @click="selectCoin(coin)"
      >
        <img class="coin-icon" :src="coin.icon" :alt="coinKey(coin) + 'icon'" />
        <p class="coin-name">{{ coinKey(coin) }}</p>
        <svg
          class="svg-heart svg-heart--coin"
          :class="{ 'svg-heart--selected': isFavorite(coin) }"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          @click="changeFavorite(coin)"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/services/event_bus.js";
export default {
  name: "FilterSearchModal",
  data: () => ({
    categories: ["All", "USDT", "BUSD", "Favorites"],
    selected: "All",
    search: "",
  }),
  props: {
    coins: {
      type: Array,
    },
  },
  watch: {
    search() {
      this.search = this.search.toUpperCase();
      localStorage.setItem("coin_search", this.search);
      this.$emit("changeFilter");
    },
  },
  methods: {
    changeCategory: function (category) {
      this.selected = category;
      localStorage.setItem("coin_trade_type", category);
      this.$emit("changeFilter");
    },
    coinKey: function (coin) {
      return coin.tag + "/" + coin.trade;
    },
    isFavorite: function (coin) {
      return (JSON.parse(localStorage.getItem("coin_fav")) ?? []).includes(
        this.coinKey(coin)
      );
    },
    changeFavorite: function (coin) {
      let fav = JSON.parse(localStorage.getItem("coin_fav")) ?? [];
      if (fav.includes(this.coinKey(coin))) {
        console.log(fav);
        fav = fav.filter((data) => data != this.coinKey(coin));
        console.log(fav);
      } else {
        fav.push(this.coinKey(coin));
      }
      localStorage.setItem("coin_fav", JSON.stringify(fav));
      this.$emit("changeFilter");
    },
    selectCoin: function (coin) {
      EventBus.$emit("select_coin", this.coinKey(coin));
    },
  },

  created() {
    localStorage.removeItem("coin_search");
  },
};
</script>

<style lang="scss" scoped>
//size
$width: 420px;
$height: 760px;
//fonts
$roboto: "Roboto", sans-serif;
//colors
$white: #fff;
$black: #000;
$grey-light: #f2f5ff;
$grey: #dde1f4;
$dark: #2c3e50;
$dark-200: #0f1b4a;
$blue: #4a6fff;
.modal {
  position: relative;
  width: $width;
  height: $height;
  padding: 48px 32px 40px;
  background-color: $white;
  box-shadow: 0px 13px 30px rgba(175, 187, 234, 0.4);
  border-radius: 24px;
  gap: 36px;
  &::before {
    content: "";
    position: absolute;
    background-color: #ccd5f9;
    left: -24px;
    top: -24px;
    width: 420px;
    height: 735px;
    border-radius: 24px;
    z-index: -1;
  }
  .svg-heart {
    height: 20px;
    width: 20px;
    fill: none;
    stroke: $dark;
    @at-root #{&}--coin {
      margin: 10px 0 10px 10px;
      stroke: $dark-200;
      &:hover {
        fill: $dark-200;
      }
    }
    @at-root #{&}--selected {
      margin: 10px 0 10px 10px;
      fill: $dark-200;
      &:hover {
        fill: $white;
      }
    }
  }
  .filter {
    gap: 24px;
    padding: 0px 16px;
    & .btn-list {
      width: 100%;
      height: 39px;
      &__item {
        flex: 1;
        border: 1px solid #dde1f4;
        border-radius: 4px;
        background-color: inherit;
        cursor: pointer;
        @include font($roboto, $black, 16px);
        line-height: 19px;
        &:hover {
          background-color: $blue;
          opacity: 0.7;
          color: $white;
          .svg-heart {
            stroke: $white;
          }
        }
        @at-root #{&}--selected {
          background-color: $blue;
          color: $white;
          pointer-events: none;
          .svg-heart {
            stroke: $white;
          }
        }
      }
    }
    & .search {
      align-items: center;
      position: relative;
      & > svg {
        position: absolute;
        height: 26px;
        width: 26px;
        fill: none;
        stroke: $black;
        left: 16px;
      }
      &__bar {
        height: 58px;
        width: 100%;
        background: $grey-light;
        border: 1px solid $grey;
        border-radius: 4px;
        padding: 16px 16px 16px 50px;
        @include font($roboto, $black, 16px);
      }
    }
  }
  .coin-list {
    padding: 0px;
    gap: 4px;
    border-radius: 4px;
    &__item {
      padding: 16px;
      height: 82px;
      @include flex(row, center, none);
      gap: 8px;
      border-radius: 4px;
      img {
        height: 100%;
      }
      .coin-name {
        @include font($roboto, $dark-200, 16px);
        flex: 1;
      }
      &:hover {
        background-color: $grey-light;
        cursor: pointer;
      }
    }
  }
}
</style>
