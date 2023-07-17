<script lang="ts">
  import { range } from "lodash";
  import { Card } from "agnostic-svelte";
  import { type Court, type Game, teams } from "../store";
  import { create_out_transition } from "svelte/internal";

  export let court: Court;
  export let game: Game | null = null;

  function getTeamById(team_id: string) {
    return $teams.find(({ id }) => id === team_id);
  }
</script>

<Card isStacked={true} isAnimated={true} isRounded={true} css="gravel court">
  <div class="title">{court.name}</div>

  {#if game}
    <div class="team">{getTeamById(game.home).name}</div>
    <div class="score">
      {#each range(0, 7) as score}
        <label>
          <input
            bind:group={game.homeScore}
            checked={score === 0}
            type="radio"
            name="{court.name}-home"
            value={score}
          />
          {score}
        </label>
      {/each}
    </div>
    <div class="score">
      {#each range(7, 14) as score}
        <label>
          <input
            bind:group={game.homeScore}
            type="radio"
            name="{court.name}-home"
            value={score}
          />
          {score}
        </label>
      {/each}
    </div>

    <div class="team">{getTeamById(game.visitor).name}</div>
    <div class="score">
      {#each range(0, 7) as score}
        <label>
          <input
            bind:group={game.visitorScore}
            checked={score === 0}
            type="radio"
            name="{court.name}-visitor"
            value={score}
          />
          {score}
        </label>
      {/each}
    </div>
    <div class="score">
      {#each range(7, 14) as score}
        <label>
          <input
            bind:group={game.visitorScore}
            type="radio"
            name="{court.name}-visitor"
            value={score}
          />
          {score}
        </label>
      {/each}
    </div>
  {/if}
</Card>

<style>
  div,
  .title {
    color: white;
  }

  .team {
    font-style: italic;
    text-decoration: underline;
  }

  .title {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .score {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  label,
  input {
    display: block;
  }
  input {
    cursor: pointer;
    margin: auto;
  }

  label {
    color: white;
    cursor: pointer;
    line-height: 0.9em;
    margin-bottom: 3px;
    clear: both;
    /*
    You can set both the <label> and <input> elements to have display: block, and then add clear: both to the CSS of the <label> element to ensure it clears any float and appears below the <input> element.
  */
  }
</style>
