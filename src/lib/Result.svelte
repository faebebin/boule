<script lang="ts">
  import Courts from "./Courts.svelte";
  import { teams, type Game, page } from "../store";
  import { games, round } from "../store";
  import { get } from "svelte/store";
  import { range } from "lodash";
  import Boules from "./Boules.svelte";
  import Ranking from "./Ranking.svelte";

  const maxRound = 5; // TODO form tournament
  $: nextRound = get(round) + 1;
  const rounds = range(1, maxRound);
  const lastRound = $round === maxRound;

  function createNextRound() {
    round.set(nextRound);
    games.createNextRound(nextRound);
    page.set("play");
  }
</script>

<Ranking />

{#if lastRound}
  <Boules title="Juhu !!!" />
{:else}
  <Boules handleClick={createNextRound} title="Next Round" />
{/if}

<style>
</style>
