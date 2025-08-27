<script lang="ts">
  import Prepare from "./lib/Prepare.svelte";
  import { range } from "lodash";
  import Play from "./lib/Play.svelte";
  import { trans } from "./trans";
  import { page, rounds, games } from "./store";
  import type { Page } from "./store";
  import Result from "./lib/Result.svelte";

  const prepare: Page = "preparation";
  const play: Page = "play";
  const result: Page = "result";
  $: [currentRound, maxRounds] = $rounds;
  let started = false;
  games.subscribe((gl) => {
    started = gl.length > 0;
  });

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

  // Reset
  let showDeleteConfirm = false;

  function deleteLocalStorage() {
    showDeleteConfirm = true;
  }

  function cancelDelete() {
    showDeleteConfirm = false;
  }

  function proceedDelete() {
    localStorage.clear();
    location.reload();
  }
</script>

<nav class="pages">
  <ol>
    <li class="page">
      <button
        on:click={() => page.set(prepare)}
        disabled={prepare === $page}
        class:current={prepare === $page}>{trans(prepare)}</button
      >
    </li>
    <li class="page">
      <button
        on:click={() => page.set(play)}
        disabled={play === $page || !started}
        class:planned={!started}
        class:current={play === $page}>{trans(play)}</button
      >
    </li>
    <li class="page">
      <button
        on:click={() => page.set(result)}
        disabled={result === $page || !started}
        class:planned={!started}
        class:current={result === $page}>{trans(result)}</button
      >
    </li>
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

{#if showDeleteConfirm}
  <div class="delete-confirm-overlay">
    <div class="delete-confirm-dialog">
      <p>Do you want to delete the whole tournament?!</p>
      <button on:click={proceedDelete} class="confirm">Yes, delete</button>
      <button on:click={cancelDelete} class="cancel">No (cancel delete)</button>
    </div>
  </div>
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
    background-color: #f9f9f9;
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
    background-color: #f9f9f9;
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
