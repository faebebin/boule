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
  $: manualRounds = null;

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
    rounds.initRounds(manualRounds || teamsCount, !!manualRounds);
  }
</script>

<Teams started={courtsCount > 0} />

<input type="number" bind:value={manualRounds} placeholder="Manual N° rounds" class="top1"/>
<div class="roundsinfo top1 roundsinfo">
{#if manualRounds}
  This value it will be used as number of rounds.
{:else if courtsCount === 0}
  Value is not set. The number of rounds is calculated according 'Schweizer System' = 'Potenz 2 hoch Rundenzahl muss größer sein als die Zahl der teilnehmenden Teams.'
{/if}
</div>


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

<style>
  .top1 {
    margin-top: 1rem;
  }

  .roundsinfo {
    font-size: 0.8em;
    color:  #646cffaa;
  }

  .roundsinfo {
    max-width: 50%;
  }
</style>
