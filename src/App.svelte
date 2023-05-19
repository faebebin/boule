<script lang="ts">
  import bouleLogo from "/boule.svg";
  import Prepare from "./lib/Prepare.svelte";
  // TODO turnier name etc.
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={bouleLogo} class="logo" alt="Vite Logo" />
    </a>
  </div>
  <h1>Turnier</h1>

  <div class="card">
    <Prepare />
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
</style>
