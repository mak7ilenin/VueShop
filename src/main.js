import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp({
    router,
    render: () => (h(App))
})
app.use(router).mount('#app')