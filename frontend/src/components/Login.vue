<template>
  <div>
    <h1 class="m-5">Movie App</h1>

    <div style="margin: 0 auto" class="form-group w-50">
      <button
        type="submit"
        class="btn btn-warning m-3 mb-5"
        v-if="isLoggedIn"
        @click.prevent="logoutUser"
      >
        Logout
      </button>

      <form v-if="!isLoggedIn">
        <input
          class="form-control mb-3"
          type="text"
          placeholder="Email"
          v-model="input.identifier"
          required
        />
        <input
          class="form-control mb-3"
          type="text"
          placeholder="Password"
          v-model="input.password"
          required
        />
        <button
          class="btn btn-warning m-3 mb-5"
          v-if="!isLoggedIn"
          type="button"
          @click.prevent="loginUser"
        >
          Login
        </button>
        <button
          class="btn btn-warning m-3 mb-5"
          @click.prevent="loginUser"
          type="button"
        >
          Sign Up
        </button>
      </form>
      <button
        class="btn btn-warning m-3 mb-5"
        @click.prevent="loginUser"
        type="button"
      >
        Test Button
      </button>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
// import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue)
export default {
  data() {
    return {
      name: "",
      nameState: null,
      submittedNames: [],
      isLoggedIn: false,
      input: {
        identifier: "",
        password: "",
      },
      responseAuth: {},
    };
  },
  async mounted() {},

  methods: {
    async auth() {

      const axios = require("axios");
 
      try {
        this.responseAuth = await axios({
          url: "http://localhost:1338/auth/local",
          method: "POST",
          data: this.input,
        });
        this.isLoggedIn = true;
      } catch (err) {
        // this.input
        this.isLoggedIn = false;
        console.log("Please Login");
        // catches errors both in fetch and response.json
        console.log(err);
      }
    },

    loginUser() {
      this.auth();
    },

    logoutUser() {
      this.auth();
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 4em;
}
</style>
