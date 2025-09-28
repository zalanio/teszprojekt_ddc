import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './style.css' // ha van saj�t CSS-ed

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

// ind�t�s
app.mount('#app')
