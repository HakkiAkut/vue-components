<template>
  <div class="o-wrapper">
    <h2 class="a-title">Click Buttons to see Alerts</h2>
    <div class="m-position">
      <label for="select-pos">Select a position</label>
      <select
        class="m-position-select column"
        name="select-pos"
        v-model="selectedPosition"
      >
        <option v-for="item in positions" :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="m-alert-list">
      <button
        class="m-alert-list__item"
        v-for="btn in buttons"
        :key="btn.name"
        :class="`-${btn.name}`"
        @click="callAlert(btn)"
      >
        {{ btn.name }}
      </button>
    </div>
  </div>
</template>

<script>
import EventBus from "@/services/event-bus.js";
export default {
  name: "CustomAlertUsage",
  data: () => ({
    selectedPosition: "Right Top",
    positions: [
      "right-top",
      "right-center",
      "right-bottom",
      "left-top",
      "left-center",
      "left-bottom",
      "center-top",
      "center",
      "center-bottom",
    ],
    buttons: [
      {
        name: "success",
        title: "Success alert",
        desc: "Description of the Success alert",
      },
      {
        name: "error",
        title: "Error alert",
        desc: "Description of the Error alert",
      },
      {
        name: "warning",
        title: "Warning alert",
        desc: "Description of the Warning alert",
      },
      {
        name: "information",
        title: "Information alert",
        desc: "Description of the Information alert",
      },
    ],
  }),
  methods: {
    callAlert: function (item) {
      EventBus.$emit("custom-alert", {
        type: item.name,
        title: item.title,
        desc: item.desc,
        duration: 2,
        position: this.selectedPosition,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// colors
$white: #fff;
$black: #000;
$grey: #807c7c;

$error: #feefef;
$success: #edf9f0;
$warning: #fff4ec;
$info: #eef2fa;

$error-dark: #f17474;
$success-dark: #3fd163;
$warning-dark: #d37a3a;
$info-dark: #3d66b8;

.o-wrapper {
  @include flex(column, center, center);
  gap: 40px;

  .a-title {
    @include font("Arial" sans-serif, $black, 40px);
  }

  .m-alert-list {
    @include flex(row, center, center);
    gap: 40px;
    &__item {
      padding: 20px;
      @include font("Arial" sans-serif, $white, 20px);
      cursor: pointer;
      &.-success {
        background-color: $success;
        border: 1px solid $success-dark;
        color: $success-dark;
      }
      &.-error {
        background-color: $error;
        border: 1px solid $error-dark;
        color: $error-dark;
      }
      &.-warning {
        background-color: $warning;
        border: 1px solid $warning-dark;
        color: $warning-dark;
      }
      &.-information {
        background-color: $info;
        border: 1px solid $info-dark;
        color: $info-dark;
      }
    }
  }

  .m-position {
    @include flex(column, center, center);
    gap: 10px;
    &-select {
      width: 300px;
      padding: 10px;
      border: 1px solid $grey;
      border-radius: 5px;
      @include font($mulish, $black, 16px);
    }
  }
}
</style>
