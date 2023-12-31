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
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js')
        }
      }
    })
  ]
});
