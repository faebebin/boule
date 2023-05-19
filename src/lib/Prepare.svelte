<script lang="ts">
  import Teams from "./Teams.svelte";
  import Courts from "./Courts.svelte";
  import type { Player, Team, Court } from "../store";
  import { v4 as uuidv4 } from "uuid";
  import { courts, teams } from "../store";

  let courtCount: number = 0;

  courts.subscribe((cl) => {
    courtCount = cl.length;
  });

  function firstRound() {}
</script>

<Teams />
<Courts />

{#if courtCount > 0}
  <button on:click={firstRound}>first Round</button>
{/if}
