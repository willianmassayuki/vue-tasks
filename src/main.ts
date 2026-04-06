import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

// Iniciar MSW em desenvolvimento
if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  await worker.start();
}

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
