<template>
  <div class="example">
    <!-- <vue-toggle-btn></vue-toggle-btn> -->
    <Header />
    <Movies />
    <!-- <Dark /> -->
  </div>
</template>

<script>
import Movies from "./components/Movies.vue";
// import VueToggleBtn from "../node_modules/vue-toggle-btn/toggle-btn.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: { Movies, Header },
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* main.css */
:root {
  /* Variables for default theme (light-mode) */
  --background-color: #fff;
  --text-color: #060a13;
}

[data-theme="darkMode"] {
  /* Variables for dark mode */
  --background-color: #060a13;
  --text-color: #fde2df;
}

.example,
.card-body,
input {
  padding-top: 50px;
  font-size: 1em;
  padding-bottom: 100px;
  background-color: var(--background-color);
  color: var(--text-color);
}
.card-title {
  font-size: 1.3em;
}
p,
.card-subtitle {
  font-size: 1em;
  color: var(--text-color);
}
</style>
