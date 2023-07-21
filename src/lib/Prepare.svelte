<script lang="ts">
  import Teams from "./Teams.svelte";
  import Courts from "./Courts.svelte";
  import { games, page, rounds } from "../store";
  import { courts, teams } from "../store";
  import Boules from "./Boules.svelte";
  import { trans } from "../trans";

  $: courtsCount = $courts.length;
  $: teamsCount = $teams.length;
  $: gamesCount = $games.length;

  function firstRound() {
    games.createFirstRound();
    page.set("play");
  }

  function goBack() {
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

<Teams started={courtsCount > 0} />
<Courts />

{#if teamsCount < 2}
  <Boules handleClick={teams.loadExampleTeams} title="load example teams" />
{:else if courtsCount === 0}
  <Boules
    handleClick={initCourtsAndRounds}
    title="Create Courts"
    info="for {teamsCount} teams"
  />
{:else if gamesCount === 0}
  <Boules handleClick={firstRound} title="Start Round 1" info="Random matches" />
  <!--TODO recreate courts-->
{:else}
  <Boules
    handleClick={goBack}
    title="return to '{trans('play')}'"
    info="(View only)"
  />
{/if}
