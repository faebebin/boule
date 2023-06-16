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
  const [currentRound, maxRounds] = get(rounds);

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

{#if maxRounds > 0}
  <nav class="crumbs">
    <ol>
      <li class="crumb">Round</li>
      {#each range(1, $rounds[1] + 1) as r}
        <li class="crumb">
          <button on:click={() => rounds.current(r)}>{r}</button>
        </li>
      {/each}
    </ol>
  </nav>
{/if}

<style>
  .pages {
    border-bottom: 1px solid black;
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
    bottom: 0px;
  }
  .crumbs ol {
    list-style-type: none;
    padding-left: 0;
  }

  .crumb {
    display: inline-block;
  }
</style>
