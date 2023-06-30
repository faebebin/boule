<script lang="ts">
  import Teams from "./Teams.svelte";
  import Courts from "./Courts.svelte";
  import { games, page, rounds } from "../store";
  import { courts, teams } from "../store";
  import Boules from "./Boules.svelte";

  $: courtsCount = $courts.length;
  $: teamsCount = $teams.length;

  function firstRound() {
    games.createFirstRound();
    page.set("play");
  }

  // TODO
  // {#if courtsCount > 0}
  //   <button on:click={generateCourts}
  //     >{courtList.length > 0 ? "Re-" : ""}Create Courts</button
  //   >
  // {:else}{/if}

  function initCourtsAndRounds() {
    courts.generateCourts(teamsCount);
    rounds.initRounds(teamsCount);
  }
</script>

<Teams />
<Courts />

{#if teamsCount < 2}
  <Boules handleClick={teams.loadExampleTeams} title="load example teams" />
{:else if courtsCount === 0}
  <Boules handleClick={initCourtsAndRounds} title="Create Courts" />
{:else}
  <Boules handleClick={firstRound} title="Start 1.Round" />
  <!--TODO recreate courts-->
{/if}
