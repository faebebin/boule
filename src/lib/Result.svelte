<script lang="ts">
  import { teams, type Game, page } from "../store";
  import { games, rounds } from "../store";
  import { get } from "svelte/store";
  import Boules from "./Boules.svelte";
  import Ranking from "./Ranking.svelte";

  const [current, max] = get(rounds);
  const nextRound = current + 1;
  // FIXME more solid rounds
  let isFinalRound = current === max;

  function createNextRound() {
    rounds.next();
    games.createNextRound(nextRound);
    page.set("play");
  }
</script>

<Ranking showRank />

{#if isFinalRound}
  <Boules title="fin 🏆 !" />
{:else}
  <Boules handleClick={createNextRound} title={`Next Round ${nextRound}`} />
{/if}

<style>
</style>
