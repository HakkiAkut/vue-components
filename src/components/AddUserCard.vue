<template>
  <div class="panel column">
    <div class="m-panel-desc column">
      <p class="m-panel-desc__item -title">Already Working Together?</p>
      <p class="m-panel-desc__item">
        Log in to your account and connect with<br />
        your teammates
      </p>
    </div>
    <div class="m-panel-input">
      <input class="m-panel-input__item" type="text" v-model="email" />
      <svg class="a-svg" viewBox="0 0 24 24" @click="addUser">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </div>
    <div class="m-panel-users row">
      <circle-user-avatar
        size="medium"
        class="m-panel-users__item"
        v-for="item in users"
        :url="item.picture"
        :key="item.email"
      />
      <!-- <div class="tooltip">{{ item.name }}</div> -->
    </div>
  </div>
</template>

<script>
import EventBus from "@/services/event-bus";
import CircleUserAvatar from "./CircleUserAvatar.vue";
export default {
  name: "AddUserCard",
  data: () => ({
    email: "",
  }),
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  components: { CircleUserAvatar },
  methods: {
    addUser: function () {
      EventBus.$emit("add-user-card", this.email);
      this.email = "";
    },
  },
};
</script>

<style lang="scss" scoped>
$width: 950px;
$height: 370px;
$white: #fff;
$black: #000;
$background: #dde5f9;
$linear-1: #173ab7;
$linear-2: #5271e0;
$background-input: rgba(243, 248, 254, 0.4);
.panel {
  align-items: center;
  position: relative;
  width: $width;
  height: $height;
  background: linear-gradient(281.6deg, $linear-1 0.22%, $linear-2 100.26%);
  border-radius: 20px;
  padding: 85px;
  gap: 30px;

  &::after {
    position: absolute;
    top: -25px;
    left: -25px;
    z-index: -1;
    content: "";
    width: 1000px;
    height: 420px;
    background-color: $background;
    border-radius: 30px;
  }

  .m-panel-desc {
    text-align: center;
    gap: 10px;

    &__item {
      @include font($mulish, $white, 18px);
      &.-title {
        @include font($mulish, $white, 36px, 700);
      }
    }
  }
  .m-panel-input {
    @include flex(none, center, none);
    position: relative;
    width: 470px;
    height: 69px;

    &__item {
      @include font($mulish, $white, 20px);
      width: 100%;
      height: 100%;
      border-radius: 50px;
      padding: 10px 70px 10px 25px;
      background-color: $background-input;
      border: 2px solid $background-input;
      &:focus {
        outline: none !important;
        border-color: $white;
      }
    }

    .a-svg {
      position: absolute;
      right: 10px;
      padding: 10px;
      border-radius: 50%;
      width: 51px;
      width: 51px;
      background-color: $white;
      fill: none;
      stroke: $black;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      cursor: pointer;
    }
  }
  .m-panel-users {
    position: absolute;
    @include flex(row, center, center);
    width: 95px;
    height: 95px;
    bottom: -50px;
    gap: 40px;
    &__item {
      position: relative;
      width: fit-content;
      height: fit-content;
      border-radius: 50%;
      box-shadow: 0px 14px 25px -15px rgba(82, 113, 224, 0.5);
      .tooltip {
        position: absolute;
        visibility: hidden;
        background-color: white;
        box-shadow: 0px 14px 25px -15px rgba(82, 113, 224, 0.5);
        z-index: 5;
      }

      &:hover .tooltip {
        visibility: visible;
      }
    }
  }
}
</style>
