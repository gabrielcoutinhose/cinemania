import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { installFontAwesome } from "@/plugins/fontawesome";
import { installVueMask } from "@/plugins/mask";

const app = createApp(App);

installFontAwesome(app);
installVueMask(app);

app.use(router);
app.use(store);
app.mount("#app");
