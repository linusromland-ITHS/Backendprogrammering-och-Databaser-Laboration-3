//External Dependencies import:
import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

//Internal Dependencies import:
import App from './App.vue';
import router from './router';
import './styles/tailwind.css';

//Creats the Vue app
const app = createApp(App);

//Registers vue-router
app.use(router);

//Registers vue-toastification
app.use(Toast, {
	transition: 'Vue-Toastification__bounce',
	maxToasts: 20,
	newestOnTop: true,
	timeout: 2500,
	hideProgressBar: true,
});

//Mounts app to div with id app
app.mount('#app');
