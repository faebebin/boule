<script lang="ts">
  import bouleLogo from "/boule.svg";
</script>

<div class="boules">
  <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
    <img src={bouleLogo} class="logo" alt="Vite Logo" />
  </a>
</div>

<style>
  .boules {
    position: fixed;
    top: 10px;
    right: 10px;
  }

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
