<template>
  <div class="alert" :class="{ 'alert--error': type == 'error' }">
    <div class="column">
      <p class="alert-title -yellow">Oops, an error occurred! {{ type }}</p>
      <p class="alert-desc">Apologies for inconvenience</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomAlert",
  props: {
    type: {
      type: String, // can be success or error
      default: "error",
    },
  },
};
</script>

<style lang="scss" scoped>
// size
$width: 450px;
$height: 170px;
$p-15: 15px;

// colors
$background: #fff;
$error: #feefef;
$success: #edf9f0;
$warning: #fff4ec;
$info: #eef2fa;
.alert {
  position: relative;
  box-shadow: 20px 34px 74px rgba(21, 21, 106, 0.07);
  @include flex(row, center, none);
  width: $width;
  min-height: $height;
  height: auto;
  background-color: $background;
  border-radius: 15px;
  overflow: hidden;
  gap: 15px;

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
