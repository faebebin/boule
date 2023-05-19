<script lang="ts">
  import { courts, teams } from "../store";
  import type { Court, Team } from "../store";

  let teamsList: Team[] = [];

  teams.subscribe((tl) => {
    // TODO more elegant
    // Make editable with each and bind:
    teamsList = tl;
  });
</script>

{#if teamsList.length > 0}
  <ul>
    {#each teamsList as { name }}
      <li>
        <ul>
          {name}
        </ul>
      </li>
    {/each}
  </ul>
{/if}
