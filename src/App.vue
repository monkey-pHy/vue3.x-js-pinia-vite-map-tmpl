<script setup>
import { RouterLink, RouterView } from 'vue-router'
console.log(import.meta.env.VITE_APP_SERVER);
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
