<template>
  <img class="a-avatar" :class="size" :src="url" alt="user image" />
</template>

<script>
export default {
  name: "CircleUserAvatar",

  data: () => ({
    hover: false,
  }),
  props: {
    url: {
      type: String,
      default: "https://kstu.edu.tr/kstu-file/uploads/default-user-image.png",
    },
    size: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log(this.size);
  },
};
</script>

<style lang="scss" scoped>
$white: #fff;
.a-avatar {
  object-fit: cover;
  border-radius: 50%;
  background-color: $white;
  border: 2px solid $white;
  padding: 4px;
  &.medium {
    width: 95px;
    height: 95px;
  }
}
</style>
