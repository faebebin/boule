<script lang="ts">
  import { players, teams } from "../store";
  import type { Player, Team } from "../store";
  import { v4 as uuidv4 } from "uuid";
  import { Player } from "./Player.svelte";

  // FIXME add teams instead!
  let teamList: Team[] = [];

  teams.subscribe((tl) => {
    teamList = tl;
  });

  let newName = "";

  function add() {
    // TODO add to store?
    players.update((pl) => {
      pl.push({
        id: uuidv4(),
        name: newName,
      });
      return pl;
    });
    newName = "";
  }
</script>

<ul>
  {#each teamList as { id, members, name, points }, i}
    <li>
      <ul>
        `${i + 1}: ${name || id.slice(5)} (${points} wins)`
      </ul>
    </li>
  {/each}
</ul>

<input
  bind:value={newName}
  placeholder="Jean-Pierre Baptiste"
  required
  minlength="2"
  maxlength="40"
/>

{#if newName.length >= 2}
  <button on:click={add}> + </button>
{/if}
