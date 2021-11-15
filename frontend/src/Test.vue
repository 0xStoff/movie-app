<template>
  <div class="container">
    <theme-button />
    <div class="text">
      <h1>Dark Mode</h1>
      <p>source: https://github.com/TylerPottsDev/vue-dark-mode</p>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet.
      </p>
    </div>
    <div class="container-center">
      <div class="card">
        <p>Wer sitzt dort so spät, bei Nacht und Wind?</p>
        <p>Entwickler Clemens, mit einem Pint.</p>
        <p>Man hört ihn seufzen, ziemlich hart -</p>
        <p>Sonntag ist's, die Deadline naht</p>
      </div>
    </div>
  </div>
</template>

<script>
import ThemeButton from "./components/ThemeButton.vue";

export default {
  name: "App",
  components: { ThemeButton },
};
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
/* Define styles for the default root window element */
:root {
  --background-color-primary: #ebebeb;
  --background-color-secondary: #fafafa;
  --accent-color: #cacaca;
  --text-primary-color: #222;
  --element-size: 4rem;
}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
  --background-color-primary: #1e1e1e;
  --background-color-secondary: #2d2d30;
  --accent-color: #3f3f3f;
  --text-primary-color: #ddd;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.container {
  color: var(--text-primary-color);
  background-color: var(--background-color-primary);
  padding: 1em 1em 10em 1em;
}

.card {
  padding: 2rem 4rem;
  height: 200px;
  width: 300px;
  margin: 0 auto;
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  background-color: var(--background-color-secondary);
}

.text {
  padding-top: 3em;
  font-size: 1.5em;
  padding-bottom: 2em;
  width: 50%;
  margin: 0 auto;
}
</style>
