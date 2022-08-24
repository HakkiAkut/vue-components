<template>
  <div id="app">
    <div class="container">
      <custom-alert v-model="alert" />
      <router-view />
    </div>
  </div>
</template>

<script>
import CustomAlert from "@/components/molecules/CustomAlert.vue";
import EventBus from "@/services/event-bus";
export default {
  name: "App",
  data: () => ({
    alert: { show: false, title: "", desc: "", duration: 1, type: "success" },
  }),
  components: { CustomAlert },
  created() {
    EventBus.$on("custom-alert", (data) => {
      data.show = true;
      this.alert = data;
    });
  },
};
</script>

<style>
body {
  background-color: #e5eaf9;
}
#app {
  display: flex;
  justify-content: center;
  width: 100%;
}
.container {
  justify-content: center;
  display: flex;
  width: 1240px;
  height: 100%;
}
</style>
