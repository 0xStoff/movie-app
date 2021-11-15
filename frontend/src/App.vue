<template>
  <div class="app-container">
    <theme-button class="theme-button"/>
    <Movies />
  </div>
</template>

<script>
import Movies from "./components/Movies.vue";

import ThemeButton from "./components/ThemeButton.vue";



export default {
  name: "App",
  components: { Movies, ThemeButton },
};
</script>

<style>

/* Define styles for the default root window element */
:root {
  --background-color-primary: #ebebeb;
  --background-color-secondary: #fafafa;
  --accent-color: #cacaca;
  --text-primary-color: #060a13;
  --element-size: 4rem;
    background-color: var( --background-color-secondary);

}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
  --background-color-primary: #060a13;
  --background-color-secondary: #2d2d30;
  --accent-color: #3f3f3f;
  --text-primary-color: #ddd;
  background-color: var( --background-color-secondary);
}


#app {
   font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}


.app-container,
.card-body,
input {
  padding-top: 50px;
  font-size: 1em;
  padding-bottom: 100px;
  background-color: var(--background-color-secondary);
  color: var(--text-primary-color);
}
.card-title {
  font-size: 1.3em;
}

.theme-button {
  margin-left: 50px;
}

</style>
