<script lang="ts">
  import Courts from "./Courts.svelte";
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
  import { Card } from "agnostic-svelte";
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

  function getTeamById(team_id: string) {
    return $teams.find(({ id }) => id === team_id);
  }

  function getCourtById(court_id: string) {
    return $courts.find(({ id }) => id === court_id);
  }
</script>

<div class="container">
  {#each gamesOfRound as { court, home, visitor, homeScore, visitorScore, id }, index (id)}
    <Card
      isStacked={true}
      isShadow={true}
      isAnimated={true}
      isBorder={true}
      isRounded={true}
    >
      <div class="gravel">
        <p>{getCourtById(court)?.name || `Platz ${index}`}</p>

        <label for="home">{getTeamById(home).name}</label>
        <input
          class="input"
          id="home"
          bind:value={homeScore}
          required
          type="number"
          min="0"
          max="13"
        />

        <label for="visitor">{getTeamById(visitor).name}</label>
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
    </Card>
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
