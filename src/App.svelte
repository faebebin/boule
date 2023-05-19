<script lang="ts">
  import bouleLogo from "/boule.svg";
  import Prepare from "./lib/Prepare.svelte";
  import Ranking from "./lib/Ranking.svelte";
  import Play from "./lib/Play.svelte";

  type Page = "preparation" | "play" | "ranking";
  const pages: Page[] = ["preparation", "play", "ranking"];
  let page: Page = "preparation";

  function goTo(p: Page) {
    page = p;
  }
  // TODO turnier name etc.
</script>

<nav class="pages">
  <ol>
    {#each pages as p}
      <li class="page">
        <button on:click={() => goTo(p)} disabled={p === page}>{p}</button>
      </li>
    {/each}
  </ol>
</nav>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={bouleLogo} class="logo" alt="Vite Logo" />
    </a>
  </div>
  <h1>Turnier</h1>

  {#if page === "preparation"}
    <Prepare />
  {:else if page === "play"}
    <Play />
  {:else if page === "ranking"}
    <Ranking />
  {/if}
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

  nav {
    border-bottom: 1px solid black;
  }

  .pages ol {
    list-style-type: none;
    padding-left: 0;
  }

  .page {
    display: inline-block;
  }
</style>
