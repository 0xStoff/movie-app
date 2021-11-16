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

/* Define styles for the default root window element 

100 (#1C1C1C) — used mainly for titles and bold text.
200 (#585757) — used primarily for body text.
300 (#969696) — widely used for small text and to fill icons.
400 (#E8E8E8) — used for small details such as borders, dividers and line colors.*/

:root {
  --background-color-primary: #ffffff;
  --background-color-secondary: #fafafa;
  --accent-color: #131313;
  --text-primary-color: #383838;
  --element-size: 4rem;
    background-color: var( --background-color-primary);

}

/* Define styles for the root window with dark - mode preference  */

:root.dark-theme {
  --background-color-primary: #212529;
  --background-color-secondary: #1f1b24;
  --accent-color: #eeeeee;
  --text-primary-color: #eeeeee;
  background-color: var( --background-color-primary);
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
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
}

.card-body {
  background-color: var(--background-color-secondary);
}
.card-title {
  font-size: 1.3em;
}

.theme-button {
  margin-left: 50px;
}

</style>
