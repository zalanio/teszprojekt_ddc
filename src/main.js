import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './style.css' // ha van saját CSS-ed

const app = createApp(App)

// Pinia
app.use(createPinia())

// Router
app.use(router)

// Toast plugin
app.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000
})

// indítás
app.mount('#app')
