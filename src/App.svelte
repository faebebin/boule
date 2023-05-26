<script lang="ts">
  import Prepare from "./lib/Prepare.svelte";
  import Play from "./lib/Play.svelte";
  import { trans } from "./trans";
  import { page } from "./store";
  import type { Page } from "./store";
  import Result from "./lib/Result.svelte";

  const pages: Page[] = ["preparation", "play", "result"];

  // TODO turnier name etc.

  // Workflow
  // 1. Prepare:  Teams and Courts
  //  => create first round
  // 2. Play: start, stop
  //  => evaluate
  // 3. prov. Result:
  //  => next round
  // 2. ... 3.
  //  => final Result!
</script>

<nav class="pages">
  <ol>
    {#each pages as p}
      <li class="page">
        <button on:click={() => page.set(p)} disabled={p === $page}
          >{trans(p)}</button
        >
      </li>
    {/each}
  </ol>
</nav>

<main>
  {#if $page === "preparation"}
    <Prepare />
  {:else if $page === "play"}
    <Play />
  {:else if $page === "result"}
    <Result />
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
