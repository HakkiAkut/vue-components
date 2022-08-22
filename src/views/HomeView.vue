<template>
  <div class="home">
    <filter-search-modal :coins="coins" />
    <cookie-preferences-modal />
    <enter-password />
    <add-item-modal />
  </div>
</template>

<script>
import AddItemModal from "@/components/AddItemModal.vue";
import EnterPassword from "@/components/EnterPassword.vue";
import CookiePreferencesModal from "@/components/CookiePreferencesModal.vue";
import FilterSearchModal from "@/components/FilterSearchModal.vue";
import { mapActions, mapGetters } from "vuex";
import eventBus from "@/services/event-bus.js";
export default {
  name: "HomeView",
  components: {
    AddItemModal,
    EnterPassword,
    CookiePreferencesModal,
    FilterSearchModal,
  },
  data: () => ({
    coins: [],
  }),

  methods: {
    ...mapActions(["fetchCoins"]),
    filteredCoins: function () {
      this.coins = this.getCoins.filter(this.filterByType); // type
      this.coins = this.coins.filter(this.filterBySearch);
    },
    filterByType: function (obj) {
      let type = localStorage.getItem("coin_trade_type");
      if (type == "All" || type == null) {
        return true;
      } else if (type == "Favorites") {
        let fav = JSON.parse(localStorage.getItem("coin_fav")) ?? [];
        return fav.includes(obj.tag + "/" + obj.trade);
      } else {
        if (obj.trade == type) {
          return true;
        }
        return false;
      }
    },
    filterBySearch: function (obj) {
      let search = localStorage.getItem("coin_search") ?? "";
      return obj.tag.includes(search);
    },
  },
  computed: {
    ...mapGetters(["getCoins"]),
  },
  mounted() {
    eventBus.$on("select_coin", (data) => {
      alert(data);
    });
    eventBus.$on("change_filter", () => {
      this.filteredCoins();
    });
  },
  created() {
    this.fetchCoins();
    this.coins = this.getCoins;
  },
};
</script>

<style>
.home {
  display: flex;
  gap: 55px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 100%;
  z-index: 0;
}
</style>
