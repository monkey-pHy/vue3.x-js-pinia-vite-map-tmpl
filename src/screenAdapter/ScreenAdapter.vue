<!-- 大屏适配方案组件 -->
<template>
  <div class="screen-adapter-wrap"
       :style="style">
    <slot />
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
export default {
  name: 'ScreenAdapter',
  props: {
    width: {
      type: String,
      default: '1920'
    },
    height: {
      type: String,
      default: '1080'
    }
  },
  setup (props) {
    const style = ref({
      width: props.width + 'px',
      height: props.height + 'px',
      transform: 'scale(1) translate(0, 0)'
    });
    const getScale = () => {
      const w = window.innerWidth / props.width;
      const h = window.innerHeight / props.height;
      return w < h ? w : h;
    }
    const setScale = () => {
      style.value.transform = 'scale(' + getScale() + ') translate(0, 0)'
      console.log('style.value.transform', style.value.transform);
    };
    onMounted(() => {
      setScale();
      window.onresize = setScale;
    });
    return {
      style
    }
  }
}
</script>
<style lang="scss" scoped>
.screen-adapter-wrap {
  transform-origin: 0 0;
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.3s;
  width: 100%;
  height: 100%;
}
</style>