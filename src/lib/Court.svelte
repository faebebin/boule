<script lang="ts">
  import { Card } from "agnostic-svelte";
  import { type Court, type Game, teams } from "../store";

  export let court: Court;
  export let game: Game | null = null;

  function getTeamById(team_id: string) {
    return $teams.find(({ id }) => id === team_id);
  }
</script>

<Card isStacked={true} isAnimated={true} isRounded={true} css="gravel court">
  <div class="title">{court.name}</div>

  {#if game}
    {#if getTeamById(game.home)}
      <label for="home">{getTeamById(game.home).name}</label>
      <input
        class="input"
        id="home"
        bind:value={game.homeScore}
        required
        type="number"
        min="0"
        max="13"
      />
    {/if}

    <label for="visitor">{getTeamById(game.visitor).name}</label>
    <input
      class="input"
      id="visitor"
      bind:value={game.visitorScore}
      required
      type="number"
      min="0"
      max="13"
    />
  {/if}
</Card>

<style>
  .title {
    color: white;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  label {
    color: white;
  }
</style>
