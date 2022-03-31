import { resolve } from "path"; // 主要用于alias文件路径别名
import { defineConfig, loadEnv } from "vite";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, __dirname);
  return {
    plugins: [vue(), VueSetupExtend()],
    //打包资源基本路径
    base: env.VITE_BASE_URL,
    css: {
      // css预设器配置项
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@assets/scss/reset.scss";
                         @import "@assets/scss/globalVal.scss";
                         @import "@assets/scss/globalFun.scss";
                         @import "@assets/scss/common.scss";
                          `,
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "@http": resolve(__dirname, "./src/http"),
        "@global": resolve(__dirname, "./src/global"),
        "@plugins": resolve(__dirname, "./src/plugins"),
        "@components": resolve(__dirname, "./src/components"),
        "@views": resolve(__dirname, "./src/views"),
        "@assets": resolve(__dirname, "./src/assets"),
        "@tools": resolve(__dirname, "./src/tools"),
        "@store": resolve(__dirname, "./src/store"),
      },
    },
    //打包相关配置
    build: {
      //指定输出路径
      outDir: "./dist/vue3.x-vite-pinia-map-tmpl",
      // 指定生成静态资源的存放路径
      assetsDir: "assets",
      rollupOptions: {
        output: {
            chunkFileNames: 'assets/js/[name]-[hash].js',
            entryFileNames: 'assets/js/[name]-[hash].js',
            assetFileNames: 'assets/[ext]/name-[hash].[ext]'
        }
      }
    },
    server: {
      host: "0.0.0.0",
      cors: true,
      port: 8080,
      open: true,
      https: false, //是否开启https
      "/api": {
        target: "http://192.168.154.31:6081/vue3.x-vite-pinia-map-tmpl/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  };
});
