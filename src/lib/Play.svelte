<script lang="ts">
  import Courts from "./Courts.svelte";
  import { teams, type Game, page } from "../store";
  import { games, round } from "../store";
  import { get } from "svelte/store";
  import { range } from "lodash";
  import Boules from "./Boules.svelte";

  const maxRound = Math.max(...$games.map(({ round }) => round));
  const rounds = range(1, maxRound);

  // TODO get phase from games(round)
  let phase: Game["status"] = "planned";

  function start() {
    // timer on
  }
  function stop() {
    // timer off
  }
  function evaluateRound() {
    // timer off
    // next game
    teams.evaluateRound(get(round));
    teams.updateRanking();
    page.set("result");
  }
</script>

<nav class="crumbs">
  <ol>
    {#each rounds as r}
      <li class="crumb">
        <button on:click={() => round.set(r)}>Round {1}</button>
      </li>
    {/each}
  </ol>
</nav>

<Courts />

{#if phase === "planned"}
  <Boules handleClick={start} title="Start Game" />
{:else if phase === "stopped"}
  <!--TODO resuem-->
  <Boules handleClick={stop} title="Stop Game" />
{:else}
  <Boules handleClick={evaluateRound} title="Evaluate Round" />
{/if}

<style>
  nav {
    border-bottom: 1px solid black;
  }

  .crumbs ol {
    list-style-type: none;
    padding-left: 0;
  }

  .crumb {
    display: inline-block;
  }

  .crumb button::after {
    display: inline-block;
    color: #000;
    content: ">";
    font-size: 80%;
    font-weight: bold;
    padding: 0 3px;
  }
</style>
