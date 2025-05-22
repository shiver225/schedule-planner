import axios from 'axios';

window.axios = axios;
window.axios.defaults.baseURL = 'http://localhost:4000';
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';