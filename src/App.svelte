<script lang="ts">
  import Prepare from "./lib/Prepare.svelte";
  import { range } from "lodash";
  import Play from "./lib/Play.svelte";
  import { trans } from "./trans";
  import { page, rounds, games } from "./store";
  import type { Page } from "./store";
  import Result from "./lib/Result.svelte";
  import { exportTournament, importTournament } from "./utils";

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

  function deleteLocalStorage() {
    if (window.confirm("Do you want to delete the whole tournament?!")) {
      localStorage.clear();
      location.reload();
    }
    // If cancelled, do nothing
  }

  let showFileInput = false;
  let file: FileList | null = null;

  function showImportInput() {
    showFileInput = !showFileInput;
  }

  function processImport() {
    if (file && file[0]) {
      importTournament(file[0]);
      showFileInput = false;
      file = null;
    }
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

<div class="tools">
  <button
    class="invalid"
    on:click={deleteLocalStorage}
    title="Delete Local Storage!"
  >
    <span role="img" aria-label="Garbage Icon">🗑️</span>
  </button>

  <button
    class="current"
    on:click={exportTournament}
    title="Export to JSON file!"
  >
    <span role="img" aria-label="Export Icon">📤️</span>
  </button>

  <button
    class="current"
    on:click={showImportInput}
    title="Import from JSON file!"
  >
    <span role="img" aria-label="Import Icon">📥️</span>
  </button>

  {#if showFileInput}
    <input
      type="file"
      accept=".json"
      bind:files={file}
      on:change={processImport}
      style="margin-top: 10px;"
    />
  {/if}
</div>

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

  .tools {
    position: fixed;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .tools button {
    cursor: pointer;
    z-index: 999;
    box-shadow: -5px 10px 12px rgba(0, 0, 0, 0.2);
  }

  @media screen and (min-width: 1080px) {
    /* TODO css variable in app.css */
    .tools button {
      right: calc((100vw - 1000px) / 2);
    }
  }
</style>
