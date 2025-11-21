// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useBeverageStore } from "./stores/beverageStore";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

async function bootstrap() {
  const beverageStore = useBeverageStore();
  await beverageStore.init(); // load Firestore data and defaults
  app.mount("#app");
}

bootstrap();
