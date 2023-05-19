<script lang="ts">
  import { players, teams } from "../store";
  import type { Player, Team } from "../store";
  import { v4 as uuidv4 } from "uuid";

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

    players.update((pl) => {
      pl.push(p1, p2);
      return pl;
    });

    teams.update((t) => {
      t.push({
        id: uuidv4(),
        name: teamName,
        points: 0,
        members: [p1, p2],
      });
      return t;
    });

    [teamName, p1Name, p2Name] = ["", "", ""];
  }
</script>

<ul>
  {#each teamList as { id, members, name, points }, i}
    <li>
      <ul>
        {i + 1}: {name || id.slice(5)} ({points} wins): {members.map(
          (m) => m.name
        )}
      </ul>
    </li>
  {/each}
</ul>

<label for="team">Team</label>
<input bind:value={teamName} placeholder="Les Fromages" id="team" />

<label for="p1">P1</label>
<input
  id="p1"
  bind:value={p1Name}
  placeholder="Jean-Pierre Baptiste"
  required
  minlength="2"
  maxlength="40"
/>

<label for="p2">P2</label>
<input
  id="p1"
  bind:value={p2Name}
  placeholder="Anne-Marie Blanche"
  required
  minlength="2"
  maxlength="40"
/>

{#if p1Name.length >= 2 && p2Name.length >= 2}
  <button on:click={addTeam}> + </button>
{/if}
