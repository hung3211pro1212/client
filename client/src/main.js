import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import velocity from 'velocity-animate'
import './assets/main.css'
import store from './store'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Notifications, { velocity })
app.use(VueAwesomePaginate)
app.mount('#app')
