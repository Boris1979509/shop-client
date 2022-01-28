import { createApp } from "vue";

import App from "@/App.vue";
import "@/assets/css/index.css";

import store from "@/store";
import router from "@/router";
import components from "@/components/ui";

import i18n from "@/plugins/i18n";

const app = createApp(App);
app.use(i18n).use(router).use(store);

// App components UI
components.forEach((component) => {
  app.component(component.name, component);
});

app.mount("#app");
