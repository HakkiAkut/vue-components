<template>
  <div class="home">
    <add-item-modal />
  </div>
</template>

<script>
import AddItemModal from "@/components/AddItemModal.vue";
export default {
  name: "HomeView",
  components: {
    AddItemModal,
  },
};
</script>

<style>
.home {
  background-color: #e5eaf9;
  width: 1240px;
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
