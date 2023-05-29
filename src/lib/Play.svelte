<script lang="ts">
  import Courts from "./Courts.svelte";
  import { teams, type Game, page, games, round } from "../store";
  import { get } from "svelte/store";
  import { range } from "lodash";
  import Boules from "./Boules.svelte";
  import { Input, InputAddonItem } from "agnostic-svelte";

  const maxRound = Math.max(...$games.map(({ round }) => round)); // TODO maxrounds from start
  const rounds = range(1, maxRound);

  // TODO get phase from games(round)
  let phase: Game["status"] = "planned";

  // TODO check if `derived` store makes sense?
  let gamesOfRound: Game[] = [];

  games.subscribe((gl) => {
    gamesOfRound = gl.filter(({ round }) => round === round);
  });

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

<div class="container">
  {#each gamesOfRound as { court, homeScore, visitorScore, id } (id)}
    <div class="card gravel">
      <p>{court}</p>

      <label for="home">Home</label>
      <input
        class="input"
        id="home"
        bind:value={homeScore}
        required
        type="number"
        min="0"
        max="13"
      />

      <label for="visitor">Visitor</label>
      <input
        class="input"
        id="visitor"
        bind:value={visitorScore}
        required
        type="number"
        min="0"
        max="13"
      />
    </div>
  {/each}
</div>

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
