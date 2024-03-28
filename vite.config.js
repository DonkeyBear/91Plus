import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: '91 Plus',
        icon: 'https://www.91pu.com.tw/icons/favicon-32x32.png',
        namespace: 'https://github.com/DonkeyBear',
        author: 'DonkeyBear',
        antifeature: [{ type: 'tracking', description: '使用 Google Analytics 了解使用情況' }],
        description: '自由轉調、輕鬆練歌，打造 91 譜的最佳體驗！',
        match: [
          '*://www.91pu.com.tw/m/*',
          '*://www.91pu.com.tw/song/*'
        ],
        grant: ['GM_setValue', 'GM_getValue']
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
          pinia: cdn.jsdelivr('pinia', 'dist/pinia.iife.min.js'),
          'pinia-plugin-persistedstate': cdn.jsdelivr('pinia-plugin-persistedstate', 'dist/index.min.js'),
          zipson: cdn.jsdelivr('zipson', 'dist/zipson.min.js'),
          html2canvas: cdn.jsdelivr('html2canvas', 'dist/html2canvas.min.js'),
          vexchords: cdn.jsdelivr('vexchords', 'dist/vexchords.dev.min.js')
        }
      }
    })
  ]
});
