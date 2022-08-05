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
  background-color: #fff;
}
#app {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.container {
  width: 1240px;
  height: 100vh;
}
</style>
