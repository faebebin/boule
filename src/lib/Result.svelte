<script lang="ts">
  import Courts from "./Courts.svelte";
  import { teams, type Game, page } from "../store";
  import { games, rounds } from "../store";
  import { get } from "svelte/store";
  import { range } from "lodash";
  import Boules from "./Boules.svelte";
  import Ranking from "./Ranking.svelte";

  const [current, max] = $rounds;
  const nextRound = current + 1;
  let isFinalRound = current === max;

  function createNextRound() {
    rounds.next();
    games.createNextRound(nextRound);
    page.set("play");
  }
</script>

<Ranking showRank />

{#if isFinalRound}
  <Boules title="Juhu !!!" />
{:else}
  <Boules handleClick={createNextRound} title={`Next Round ${nextRound}`} />
{/if}

<style>
</style>
