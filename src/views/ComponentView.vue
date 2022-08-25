<template>
  <div class="container">
    <image-links class="a-link-list" :links="getLinks[componentId - 1]" />
    <svg
      class="svg-direction"
      :class="{ 'svg-direction--available': this.$route.params.id != '1' }"
      viewBox="0 0 24 24"
      @click="changeComponent(-1)"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
    <add-item-modal v-if="componentId == 1" />
    <enter-password v-else-if="componentId == 2" />
    <cookie-preferences-modal v-else-if="componentId == 3" />
    <filter-search-modal v-else-if="componentId == 4" :coins="coins" />
    <custom-alert-usage v-else-if="componentId == 5" />
    <add-user-card v-else-if="componentId == 6" :users="getUsers" />
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
import AddItemModal from "@/components/organisms/AddItemModal.vue";
import EnterPassword from "@/components/organisms/EnterPassword.vue";
import CookiePreferencesModal from "@/components/organisms/CookiePreferencesModal.vue";
import FilterSearchModal from "@/components/organisms/FilterSearchModal.vue";
import eventBus from "@/services/event-bus.js";
import CustomAlertUsage from "@/components/usage/CustomAlertUsage.vue";
import AddUserCard from "@/components/organisms/AddUserCard.vue";

import { mapActions, mapGetters } from "vuex";
import EventBus from "@/services/event-bus.js";
import ImageLinks from "@/components/molecules/ImageLinks.vue";
export default {
  name: "ComponentView",
  components: {
    AddItemModal,
    EnterPassword,
    CookiePreferencesModal,
    FilterSearchModal,
    CustomAlertUsage,
    AddUserCard,
    ImageLinks,
  },
  data: () => ({
    coins: [],
    lastId: 6,
  }),

  methods: {
    ...mapActions(["fetchCoins", "fetchUser"]),
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
    ...mapGetters(["getCoins", "getUsers", "getLinks"]),
    componentId: function () {
      return this.$route.params.id;
    },
  },
  mounted() {
    eventBus.$on("select_coin", (data) => {
      alert(data);
    });
    eventBus.$on("change_filter", () => {
      this.filteredCoins();
    });
    eventBus.$on("add-user-card", (data) => {
      this.fetchUser(data).then((user) => {
        EventBus.$emit("custom-alert", {
          type: "success",
          title: "New User Added!",
          desc: `${user.name} added on friend list`,
          duration: 3,
        });
      });
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
  position: relative;
  min-height: 100vh;
  height: 100%;
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

  .a-link-list {
    position: absolute;
    top: 10px;
    right: 30px;
  }
}
</style>
