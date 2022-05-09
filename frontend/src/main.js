//External Dependencies import:
import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import VueSocketIO from 'vue-3-socket.io';
import io from 'socket.io-client';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';

//Internal Dependencies import:
import App from './App.vue';
import router from './router';
import './styles/tailwind.css';

//Creats the Vue app
const app = createApp(App);

//Registers vue-router
app.use(router);

//Imports RelativeTime plugin for dayjs
dayjs.extend(RelativeTime);

//Provide dayjs
app.provide('dayjs', dayjs);

//Registers vue-toastification
app.use(Toast, {
	transition: 'Vue-Toastification__bounce',
	maxToasts: 20,
	newestOnTop: true,
	timeout: 2500,
	hideProgressBar: true,
});

//Registers Socket.IO
const socketio = new VueSocketIO({ connection: io(window.location.origin) });
app.use(socketio);

//Mounts app to div with id app
app.mount('#app');
