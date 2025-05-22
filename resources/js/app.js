import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Nora from '@primeuix/themes/nora';
import './bootstrap';
import '../css/app.css';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Nora,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'theme, base, primevue'
            }
        }
    }
});

app.mount('#app');