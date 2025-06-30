import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from '../../routes';
import axios from 'axios';

// PrimeVue styles
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// Global styles
import '../css/app.css';

// Configure Axios
window.axios = axios;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Get the token from localStorage
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    ripple: true
});

app.mount('#app');