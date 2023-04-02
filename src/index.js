import vuetifyPlugin from './plugins/vuetify';
import App from './App.vue';
import Vue from 'vue';
import router from './plugins/router';

const root = new Vue({
    router,
    render: h => h(App),
    vuetify: vuetifyPlugin,
});

document.addEventListener('DOMContentLoaded', () => root.$mount('#app'));
