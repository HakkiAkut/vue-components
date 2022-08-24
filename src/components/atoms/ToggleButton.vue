<template>
  <div
    class="btn animation"
    v-on:click="changeFilter"
    v-bind:class="
      interacted ? (active ? 'animation--true' : 'animation--false') : ''
    "
  >
    <div class="slider"></div>
  </div>
</template>

<script>
export default {
  name: "ToggleButton",
  data: () => ({
    active: false,
    interacted: false,
  }),
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true,
    },
    label: {
      type: String,
    },
  },
  methods: {
    changeFilter: function () {
      this.active = !this.active;
      this.interacted = true;
      this.$emit("input", !this.value);
    },
  },
  created() {
    this.active = this.value;
  },
};
</script>

<style lang="scss" scoped>
$height: 36px;
$width: 60px;
$height-slider: 22px;
$padding: calc(($height - $height-slider) / 2);
$movement: calc($width - $height-slider - $padding);
$firstColor: #132b50;
$secondColor: white;

.btn {
  height: $height;
  padding-left: $padding;
  background-color: $firstColor;
  width: $width !important;
  border-radius: $height-slider;
  display: flex;
  align-items: center;
  cursor: pointer;
  & .slider {
    height: $height-slider;
    background-color: $secondColor;
    aspect-ratio: 1;
    border-radius: 50%;
    margin: 0;
  }
  &.animation {
    animation-fill-mode: forwards;
    animation-duration: 1s;
    @at-root #{&}--true {
      animation-name: changeToTrue;
      & .slider {
        background-color: $firstColor;
      }
    }
    @at-root #{&}--false {
      animation-name: changeToFalse;
      & .slider {
        background-color: $secondColor;
      }
    }
  }
  @keyframes changeToTrue {
    0% {
      padding-left: $padding;
      border: 2px solid $secondColor;
    }
    100% {
      padding-left: $movement;
      background-color: $secondColor;
      border: 2px solid $firstColor;
    }
  }
  @keyframes changeToFalse {
    0% {
      padding-left: $movement;
    }
    100% {
      padding-left: $padding;
      background-color: $firstColor;
    }
  }
}
</style>
