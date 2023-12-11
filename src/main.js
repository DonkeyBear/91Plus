import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import './styles/styles.scss';
import init from './modules/init';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
  .use(pinia)
  .mount(
    (() => {
      const app = document.createElement('div');
      app.id = 'vue-91plus';
      document.body.append(app);
      return app;
    })()
  );

init();