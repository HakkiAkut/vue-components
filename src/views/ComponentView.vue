<template>
  <div class="container">
    <svg
      class="svg-direction"
      :class="{ 'svg-direction--available': this.$route.params.id != '1' }"
      viewBox="0 0 24 24"
      @click="changeComponent(-1)"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
    <CustomAlert v-if="this.$route.params.id == 5" type="error" />
    <add-item-modal v-else-if="this.$route.params.id == 4" />
    <enter-password v-else-if="this.$route.params.id == 3" />
    <cookie-preferences-modal v-else-if="this.$route.params.id == 2" />
    <filter-search-modal
      :coins="coins"
      v-else-if="this.$route.params.id == 1"
    />
    <svg
      class="svg-direction"
      :class="{
        'svg-direction--available': this.$route.params.id != String(lastId),
      }"
      viewBox="0 0 24 24"
      @click="changeComponent(1)"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </div>
</template>

<script>
import AddItemModal from "@/components/AddItemModal.vue";
import EnterPassword from "@/components/EnterPassword.vue";
import CookiePreferencesModal from "@/components/CookiePreferencesModal.vue";
import FilterSearchModal from "@/components/FilterSearchModal.vue";
import { mapActions, mapGetters } from "vuex";
import eventBus from "@/services/event-bus.js";
import CustomAlert from "@/components/CustomAlert.vue";
export default {
  name: "ComponentView",
  components: {
    AddItemModal,
    EnterPassword,
    CookiePreferencesModal,
    FilterSearchModal,
    CustomAlert,
  },
  data: () => ({
    coins: [],
    lastId: 5,
  }),

  methods: {
    changeComponent: function (direction) {
      let id = parseInt(this.$route.params.id);
      if (id + direction >= 1 && id + direction <= this.lastId) {
        this.$router.replace({
          name: "ComponentView",
          params: { id: id + direction },
        });
      }
    },

    // *** START of FilterSearchModal *** note: tried to use EventBus and Local Storage
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
    // *** End of FilterSearchModal ***
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

<style lang="scss" scoped>
// colors
$color-direction-svg: #918787;

.container {
  @include flex(row, center, space-between);
  height: 100vh;
  width: 100%;

  .svg-direction {
    width: 100px;
    height: 100px;
    fill: none;
    stroke: $color-direction-svg;
    opacity: 0.2;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;

    @at-root #{&}--available {
      cursor: pointer;
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
