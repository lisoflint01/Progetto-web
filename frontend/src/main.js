import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Admin from './pages/admin.vue';
import Appointments from './pages/appointments.vue';
import Login from './pages/login.vue';
import Patient from './pages/patient.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/admin', component: Admin },
        { path: '/appointments', component: Appointments },
        { path: '/login', component: Login },
        { path: '/patient', component: Patient },
    ]
});
createApp(App).use(router).mount('#app');
//# sourceMappingURL=main.js.map