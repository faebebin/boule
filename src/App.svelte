<script lang="ts">
  import Prepare from "./lib/Prepare.svelte";
  import Ranking from "./lib/Ranking.svelte";
  import Boules from './lib/Boules.svelte';
  import Play from "./lib/Play.svelte";
  import { trans } from "./trans";

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
        <button on:click={() => goTo(p)} disabled={p === page}
          >{trans(p)}</button
        >
      </li>
    {/each}
  </ol>
</nav>

<Boules />
<main>
  {#if page === "preparation"}
    <Prepare />
  {:else if page === "play"}
    <Play />
  {:else if page === "ranking"}
    <Ranking />
  {/if}
</main>

<style>
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
