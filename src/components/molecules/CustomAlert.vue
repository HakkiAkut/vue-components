<template>
  <div class="alert" v-if="value.show" :class="type">
    <div class="column">
      <p class="alert-title">{{ value.title }}</p>
      <p class="alert-desc">{{ value.desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomAlert",
  data: () => ({
    duration: null,
  }),
  props: {
    value: {
      type: Object,
      default: () => ({
        show: false,
        title: "",
        desc: "",
        duration: 1,
        type: "success",
        position: "right-top",
      }),
      required: true,
    },
  },
  computed: {
    type: function () {
      return `alert--${this.value.type} alert--${
        this.value.position ?? "right-top"
      }`;
    },
  },
  methods: {
    checkError: function () {
      if (
        this.value.show == null ||
        this.value.title == null ||
        this.value.desc == null ||
        this.value.duration == null ||
        this.value.type == null
      ) {
        this.changeToDefault();
        throw new Error(
          "Some values are missing. CustomAlert requires {show: Boolean, title: String, desc: String, duration: Number, type: (success or error or warning or information) }"
        );
      } else if (
        this.value.type != "success" &&
        this.value.type != "error" &&
        this.value.type != "warning" &&
        this.value.type != "information"
      ) {
        this.changeToDefault();
        throw new Error(
          "invalid type. type can only be {success or error or warning or information}"
        );
      }
    },
    changeToDefault: function () {
      this.$emit("input", {
        show: false,
        title: "",
        desc: "",
        duration: 1,
        type: "success",
        position: "right-top",
      });
    },
  },
  watch: {
    value() {
      this.checkError();
      clearTimeout(this.duration);
      this.duration = setTimeout(() => {
        this.changeToDefault();
      }, this.value.duration * 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
// size
$width: 450px;
$height: 130px;
$p-15: 15px;

// colors
$background: #fff;
$error: #feefef;
$success: #edf9f0;
$warning: #fff4ec;
$info: #eef2fa;
.alert {
  position: fixed;
  box-shadow: 20px 34px 74px rgba(21, 21, 106, 0.07);
  @include flex(row, center, none);
  width: $width;
  min-height: $height;
  height: auto;
  background-color: $background;
  border-radius: 15px;
  overflow: hidden;
  gap: 15px;
  z-index: 9999;

  &#{&}--right-top {
    right: 10px;
    top: 10px;
  }
  &#{&}--right-center {
    right: 10px;
    top: calc(50vh - ($height/2));
  }
  &#{&}--right-bottom {
    right: 10px;
    bottom: 10px;
  }
  &#{&}--left-top {
    left: 10px;
    top: 10px;
  }
  &#{&}--left-center {
    left: 10px;
    top: calc(50vh - ($height/2));
  }
  &#{&}--left-bottom {
    left: 10px;
    bottom: 10px;
  }
  &#{&}--center-top {
    top: 10px;
  }
  &#{&}--center {
    top: calc(50vh - ($height/2));
  }
  &#{&}--center-bottom {
    bottom: 10px;
  }

  &-title {
    @include font($arial, #000, 20px, 600);
  }

  &-desc {
    @include font($arial, #000, 18px);
  }

  .column {
    gap: 10px;
  }
  &::before {
    background-color: $success;
    content: url("@/assets/icons/checked.svg");
    width: 90px;
    height: $height;
    @include flex(none, center, center);
    border-bottom-right-radius: 50%;
    border-top-right-radius: 50%;
  }
  &#{&}--error::before {
    background-color: $error;
    content: url("@/assets/icons/unchecked.svg");
  }
  &#{&}--warning::before {
    background-color: $warning;
    content: url("@/assets/icons/warning.svg");
  }
  &#{&}--information::before {
    background-color: $info;
    content: url("@/assets/icons/information.svg");
  }
}
</style>
