<script lang="ts">
  import Prepare from "./lib/Prepare.svelte";
  import { range } from "lodash";
  import Play from "./lib/Play.svelte";
  import { trans } from "./trans";
  import { page, rounds } from "./store";
  import { get } from "svelte/store";
  import type { Page } from "./store";
  import Result from "./lib/Result.svelte";

  const pages: Page[] = ["preparation", "play", "result"];
  $: [currentRound, maxRounds] = $rounds;

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

  function setRound(round: number) {
    // $rounds.current(round); // TODO
  }

  function deleteLocalStorage() {
    localStorage.clear();
    location.reload();
  }
</script>

<nav class="pages">
  <ol>
    {#each pages as p}
      <li class="page">
        <button
          on:click={() => page.set(p)}
          disabled={p === $page}
          class:current={p === $page}>{trans(p)}</button
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

{#if maxRounds > 0}
  <nav class="crumbs">
    <ol>
      <li class="crumb first">Round</li>
      {#each range(1, maxRounds + 1) as r}
        <li class="crumb">
          <button
            disabled
            class:current={r === currentRound}
            class:planned={r > currentRound}
            on:click={() => setRound(r)}>{r}</button
          >
        </li>
      {/each}
    </ol>
  </nav>
{/if}

<button
  class="delete-button invalid"
  on:click={deleteLocalStorage}
  title="Delete Local Storage!"
>
  <span role="img" aria-label="Garbage Icon">🗑️</span>
</button>

<style>
  main {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pages {
    border-bottom: 1px solid black;
  }

  .first {
    margin-right: 9px;
  }

  .pages ol {
    list-style-type: none;
    padding-left: 0;
  }

  .page {
    display: inline-block;
  }

  .crumbs {
    position: fixed;
    bottom: 3px;
  }
  .crumbs ol {
    list-style-type: none;
    padding-left: 0;
  }

  .crumb {
    display: inline-block;
  }

  .planned {
    opacity: 0.5;
  }

  .delete-button {
    position: fixed;
    top: 10px;
    right: 10px;
    cursor: pointer;
    z-index: 999;
    box-shadow: -5px 10px 12px rgba(0, 0, 0, 0.2);
  }

  @media screen and (min-width: 1080px) {
    /* TODO css variable in app.css */
    .delete-button {
      right: calc((100vw - 1000px) / 2);
    }
  }
</style>
