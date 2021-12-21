import { createApp } from "vue";
import i18n from "@/plugins/i18n";
import App from "@/App.vue";
import "@/assets/css/index.css";
const app = createApp(App);

app.use(i18n);
app.mount("#app");
