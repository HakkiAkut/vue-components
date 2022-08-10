<template>
  <div class="home">
    <enter-password />
    <add-item-modal />
  </div>
</template>

<script>
import AddItemModal from "@/components/AddItemModal.vue";
import EnterPassword from "@/components/EnterPassword.vue";
export default {
  name: "HomeView",
  components: {
    AddItemModal,
    EnterPassword,
  },
};
</script>

<style>
.home {
  background-color: #e5eaf9;
  width: 1240px;
  display: flex;
  gap: 25px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>
