import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
// import Vue from 'vue'
// import { BootstrapVue } from 'bootstrap-vue'

// // Import Bootstrap an BootstrapVue CSS files (order is important)
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// // Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue)

const app = createApp(App);

app.use(VueSweetalert2);

app.mount("#app");
