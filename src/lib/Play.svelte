<script lang="ts">
  import {
    time,
    teams,
    type Game,
    page,
    games,
    rounds,
    courts,
  } from "../store";
  import Boules from "./Boules.svelte";
  import Court from "./Court.svelte";
  import { trans } from "../trans";
  import { formatTime } from "../utils";

  // TODO get phase from games(round)
  let phase: Game["status"] = "planned";

  let gamesOfRound: Game[] = [];

  games.subscribe((gl) => {
    // TODO check if `derived` store makes sense?
    // ... or custom method that add team names ...
    gamesOfRound = gl.filter((g) => g.round === $rounds[0]);
  });

  $: elapsed = 0;
  let unsubscribe = null; // from timer

  function start() {
    unsubscribe = time.subscribe((value) => {
      elapsed = value;
    });
    phase = "running";
  }
  function stop() {
    unsubscribe();
    phase = "stopped";
  }
  function evaluateRound() {
    // timer off
    // next game
    teams.evaluateRound();
    teams.updateRanking();
    page.set("result");
  }

  function getCourtById(court_id: string) {
    return $courts.find(({ id }) => id === court_id);
  }
</script>

<div class="container">
  {#each gamesOfRound as game, index (game.id)}
    <Court court={getCourtById(game.court)} {game} />
  {/each}
</div>

{#if phase === "planned"}
  <Boules handleClick={start} title="Start Game" info={formatTime(elapsed)} />
{:else if phase === "running"}
  <Boules handleClick={stop} title="Stop Game" info={formatTime(elapsed)} />
{:else if phase === "stopped"}
  <!--TODO resuem-->
  <Boules
    handleClick={evaluateRound}
    title={trans("evaluate_games")}
    info={formatTime(elapsed)}
  />
{/if}
