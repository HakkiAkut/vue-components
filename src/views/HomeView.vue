<template>
  <div class="home">
    <cookie-preferences-modal />
    <enter-password />
    <add-item-modal />
  </div>
</template>

<script>
import AddItemModal from "@/components/AddItemModal.vue";
import EnterPassword from "@/components/EnterPassword.vue";
import CookiePreferencesModal from "@/components/CookiePreferencesModal.vue";
export default {
  name: "HomeView",
  components: {
    AddItemModal,
    EnterPassword,
    CookiePreferencesModal,
  },
};
</script>

<style>
.home {
  display: flex;
  gap: 25px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px;
  width: 100%;
  z-index: 0;
}
</style>
