import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faHeart, faShoppingCart, faSearch);

app.component('font-awesome-icon', FontAwesomeIcon);

const app = createApp(App)

app.use(router)

app.mount('#app')
