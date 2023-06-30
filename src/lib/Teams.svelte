<script lang="ts">
  import { teams } from "../store";
  import type { Player, Team } from "../store";
  import { v4 as uuidv4 } from "uuid";
  import { trans } from "../trans";
  import Ranking from "./Ranking.svelte";
  import { Card, Input } from "agnostic-svelte";

  let teamList: Team[] = [];

  teams.subscribe((tl) => {
    teamList = tl;
  });

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

<div class="team-form">
  <Card isStacked={true} isShadow={true} isBorder={true} isRounded={true}>
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

    {#if p1Name.length >= 2 && p2Name.length >= 2}
      <button on:click={addTeam}>{trans("add")}</button>
    {/if}
  </Card>
</div>

<style>
  .team-form {
    margin: 1rem 0;
    max-width: 600px;
  }

</style>
