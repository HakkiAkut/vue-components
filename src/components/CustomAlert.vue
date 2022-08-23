<template>
  <div
    class="alert"
    v-if="value.show"
    :class="{ 'alert--error': value.type == 'error' }"
  >
    <div class="column">
      <p class="alert-title -yellow">{{ value.title }}</p>
      <p class="alert-desc">{{ value.desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomAlert",
  props: {
    value: {
      type: Object,
      default: () => ({
        show: false,
        title: "",
        desc: "",
        duration: 1,
        type: "success",
      }),
      required: true,
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
          "Some values are missing. CustomAlert requires {show: Boolean, title: String, desc: String, duration: Number, type: (success or error) }"
        );
      } else if (this.value.type != "success" && this.value.type != "error") {
        this.changeToDefault();
        throw new Error("invalid type. type can only be success or error }");
      }
    },
    changeToDefault: function () {
      this.$emit("input", {
        show: false,
        title: "",
        desc: "",
        duration: 1,
        type: "success",
      });
    },
  },
  watch: {
    value() {
      this.checkError();
      setTimeout(() => {
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
  position: absolute;
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
  right: 10px;
  top: 10px;

  &-title {
    @include font("roboto", #000, 20px, 600);
  }

  &-desc {
    @include font("roboto", #000, 18px, 400);
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
  &#{&}--error {
    &::before {
      background-color: $error;
      content: url("@/assets/icons/unchecked.svg");
    }
  }
}
</style>
