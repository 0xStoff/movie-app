


<template>
  <div>
    <h1 class="m-5">Movie App</h1>
    <button
          type="submit"
          class="btn btn-warning m-3 mb-5"
          v-if="!isLoggedIn"
        >
        Logout
        </button>
        <button
          class="btn btn-warning m-3 mb-5"
          v-if="isLoggedIn"
          type="button"
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
    <div>
  <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button>

  <b-modal id="modal-1" title="BootstrapVue">
    <p class="my-4">Hello from modal!</p>
  </b-modal> -->
</div> 
    <!-- <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>
    <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-bind="name in submittedNames">{{ name }}</li>
      </ul>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal> -->
  </div>
</template>

<script>
// import Vue from 'vue'
// import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue)
  export default {
    data() {
      return {
        name: '',
        nameState: null,
        submittedNames: [],
              isLoggedIn: false,

      }
    },
      async mounted() {
    
    // const fetch = await this.authUserAndFetch("GET");
    // this.movies = fetch.response.data;

       const axios = require("axios");
          const auth = {
            identifier: "admin",
        password: "Abcd1234",
      };
       try {        
         this.responseAuth = await axios({
        url: "http://localhost:1338/auth/local",
        method: "POST",
        data: auth,
      });
    this.isLoggedIn = true
  } catch(err) {
    // this.input
    this.isLoggedIn = false;
    console.log("Please Login")
    // catches errors both in fetch and response.json
    console.log(err);
  }

    
  },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    }
  }
</script>