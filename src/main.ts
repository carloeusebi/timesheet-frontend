import { createApp } from 'vue';
import './style.css';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import App from './App.vue';
import { pinia } from './stores';
import router from './routes';

createApp(App).use(pinia).use(router).mount('#app');
