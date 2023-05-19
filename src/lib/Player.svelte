<script lang="ts">
  import { players, teams } from "../store";
  import type { Player, Team } from "../store";
  import { v4 as uuidv4 } from "uuid";

  let playerList: Player[] = [];

  players.subscribe((pl) => {
    playerList = pl;
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
