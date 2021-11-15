<template>
  <div>
    <vue-toggle-btn :options="test"> </vue-toggle-btn>

    <!-- <vue-toggle-btn @isActive="isActive($event)"></vue-toggle-btn> -->
    <!-- <button class="ui button toggle" @click="isActive = !isActive">OFF</button> -->
    <button
      v-if="this.theme == 'darkMode'"
      class="btn btn-light"
      @click="toggleTheme"
      aria-label="Toggle themes"
    >
      Light
    </button>
    <button
      v-else
      class="btn btn-dark"
      @click="toggleTheme"
      aria-label="Toggle themes"
    >
      Dark
    </button>
  </div>
</template>

<script>
import VueToggleBtn from "../../node_modules/vue-toggle-btn/toggle-btn.vue";
export default {
  name: "Header",
  components: { VueToggleBtn },

  data() {
    return {
      theme: "", //When this property is empty, the theme is set to the default theme i.e. light mode.
      isActive: false,
      handle: {
        color: "#ccc", // optional
      },

      // options: {
      //   COLOR,
      // },
    };
  },

  mounted() {
    let localTheme = localStorage.getItem("theme"); //gets stored theme value if any
    document.documentElement.setAttribute("data-theme", localTheme); // updates the data-theme attribute
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme == "darkMode" ? "" : "darkMode"; //toggles theme value
      document.documentElement.setAttribute("data-theme", this.theme); // updates the data-theme attribute
      localStorage.setItem("theme", this.theme); // stores theme value in local storage
    },
    toggleDarkMode() {
      this.isActive = !this.enable;
      console.log(this.isActive);
      // this.toggleTheme();
    },
    // isActive($event) {
    //   if ($event) {
    //     console.log("setter Function");
    //   }
    // },
  },
};
</script>
<style></style>
