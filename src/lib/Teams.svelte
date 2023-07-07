<script lang="ts">
  import { teams, teamsValid } from "../store";
  import type { Player, Team } from "../store";
  import { v4 as uuidv4 } from "uuid";
  import { trans } from "../trans";
  import Ranking from "./Ranking.svelte";
  import { Card, Input } from "agnostic-svelte";

  let [teamName, p1Name, p2Name] = ["", "", ""];

  function addTeam() {
    const p1: Player = {
      id: uuidv4(),
      name: p1Name,
    };
    const p2: Player = {
      id: uuidv4(),
      name: p2Name,
    };

    teams.update((tl) => {
      tl.push({
        id: uuidv4(),
        name: teamName,
        points: 0,
        members: [p1, p2],
      });
      return tl;
    });

    [teamName, p1Name, p2Name] = ["", "", ""];
  }
</script>

<Ranking />
<div class="top1" class:valid={$teamsValid} class:invalid={!$teamsValid}>
  nombre d'équipes: {$teams.length}
</div>
{#if !$teamsValid}
  <div class="soon">
    {#if $teams.length < 2}
      Add at least 2 teams
    {:else}
      Even number of teams required. 'Freilos' is not yet implemented ...
    {/if}
  </div>
{/if}

<Card
  isStacked={true}
  isShadow={true}
  isBorder={true}
  isRounded={true}
  css="team-form"
>
  <Input
    id="team"
    isInline
    isRounded
    type="text"
    label={trans("team")}
    bind:value={teamName}
    placeholder="Les Fromages"
    required
    minlength="2"
    maxlength="40"
  />

  <Input
    id="p1"
    isInline
    isRounded
    type="text"
    label="P1"
    bind:value={p1Name}
    placeholder="Jean-Pierre Baptiste"
    required
    minlength="2"
    maxlength="40"
  />

  <Input
    id="p2"
    isInline
    isRounded
    type="text"
    label="P2"
    bind:value={p2Name}
    placeholder="Anne-Marie Blanche"
    required
    minlength="2"
    maxlength="40"
  />

  <button
    class="hide"
    class:show={p1Name.length >= 2 && p2Name.length >= 2}
    on:click={addTeam}
  >
    {trans("add")}
  </button>
</Card>

<style>
  .hide {
    visibility: hidden;
  }

  .show {
    visibility: visible;
  }

  .top1 {
    margin-top: 1rem;
  }

  .valid {
    color: #0cb614;
  }

  .invalid {
    color: red;
  }
</style>
