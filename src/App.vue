<template>
  <div id="app">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  background-color: #ffffff;
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
