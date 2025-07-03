import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { installFontAwesome } from "@/plugins/fontawesome";
import { installVueMask } from "@/plugins/mask";

const app = createApp(App);

store.dispatch("initTheme");

installFontAwesome(app);
installVueMask(app);

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
store.commit("theme/setTheme", prefersDark ? "dark" : "light");

app.use(router);
app.use(store);
app.mount("#app");
