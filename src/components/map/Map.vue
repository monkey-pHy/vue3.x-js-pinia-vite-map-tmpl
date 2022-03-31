<template>
  <div id="map-container"></div>
</template>
<script setup name="Map">
import { onMounted } from 'vue';
import { createMap } from '@plugins/mapUtil.js'
import * as mapGlobalConfig from '@global/mapGlobalConfig.js'
onMounted(() => {
  window.map = createMap('map-container', mapGlobalConfig.mapConfig);
})
</script>
<style lang="scss" scoped>
#map-container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>