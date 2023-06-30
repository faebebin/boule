<script lang="ts">
  import { Card } from "agnostic-svelte";
  import { type Court, type Game, teams } from "../store";

  export let court: Court;
  export let game: Game | null = null;

  function getTeamById(team_id: string) {
    return $teams.find(({ id }) => id === team_id);
  }
</script>

<Card
  isStacked={true}
  isShadow={true}
  isAnimated={true}
  isBorder={true}
  isRounded={true}
  css="gravel court"
>
  <p>{court.name}</p>

  {#if game}
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
