<template>
  <div class="map-controller-wrap">
    <!-- <div class="fullscreen-btn"
         @click="fullscreenControl">
      <img v-show="isFullScreen"
           src="@assets/img/map/fullscreen-btn.png"
           alt="">
      <img v-show="!isFullScreen"
           src="@assets/img/map/cancel-fullscreen-btn.png"
           alt="">
    </div> -->
    <div class="3d-btn"
         @click="modeControl">
      {{modeFlag?'3D':'2D'}}</div>
    <div class="zoom-up-btn"
         @click="changeMapZoom('up')">+</div>
    <div class="zoom-down-btn"
         @click="changeMapZoom('down')">-</div>
    <div class="navi-btn"
         @click="">
      <img src="@assets/img/map/navi-btn.png"
           alt="">
    </div>
  </div>
</template>
<script setup name="MapController">
import { ref, } from 'vue';
import * as mapGlobalConfig from '@global/mapGlobalConfig.js'

// let isFullScreen = false;
let modeFlag = ref(true);
// function fullscreenControl () {
//   if (!isFullScreen) {
//     if (window.map.getContainer().requestFullscreen) {
//       window.map.getContainer().requestFullscreen();
//     } else if (window.map.getContainer().mozRequestFullScreen) {
//       window.map.getContainer().mozRequestFullScreen();
//     } else if (window.map.getContainer().msRequestFullscreen) {
//       window.map.getContainer().msRequestFullscreen();
//     } else if (window.map.getContainer().webkitRequestFullscreen) {
//       window.map.getContainer().webkitRequestFullscreen();
//     }
//   } else {
//     if (window.document.exitFullscreen) {
//       window.document.exitFullscreen();
//     } else if (window.document.mozCancelFullScreen) {
//       window.document.mozCancelFullScreen();
//     } else if (window.document.msExitFullscreen) {
//       window.document.msExitFullscreen();
//     } else if (window.document.webkitCancelFullScreen) {
//       window.document.webkitCancelFullScreen();
//     }
//   }
//   isFullScreen = !isFullScreen;
// }

//地图模式选择（3D/2D)
function modeControl () {
  modeFlag.value = !modeFlag.value;
  window.map.easeTo({
    pitch: modeFlag.value ? mapGlobalConfig.mapConfig.pitch : 0,
    bearing: 0
  })
}

//地图缩放
function changeMapZoom (type) {
  let curZoom = window.map.getZoom();
  if (type === 'up') {
    if (curZoom < 17) {
      window.map.zoomIn()
    }
  } else {
    if (curZoom > 4) {
      window.map.zoomOut();
    }
  }
}
</script>
<style scoped lang="scss">
.map-controller-wrap {
  position: absolute;
  bottom: vh(28);
  right: vw(24);
  width: vw(32);
  height: vh(176);
  z-index: 2;
  div {
    margin-top: vh(4);
    width: vh(32);
    height: vh(32);
    background: #1c1c1b;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    @include flex-row();
    justify-content: center;
    align-items: center;
    img {
      width: vh(24);
      height: vh(24);
    }
  }
}
</style>