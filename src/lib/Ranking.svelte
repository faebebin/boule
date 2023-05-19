<script lang="ts">
  import { courts, teams } from "../store";
  import type { Court, Team } from "../store";

  let teamsList: Team[] = [];

  teams.subscribe((tl) => {
    // TODO add to store custom update function
    tl.sort((a, b) => a.points - b.points);
    teamsList = tl;
  });
</script>

{#if teamsList.length > 0}
  <ul>
    {#each teamsList as { name, points, members }, i}
      <li>
        <ul>
          {i}. {name} [{members[0]}, {members[1]}]
        </ul>
      </li>
    {/each}
  </ul>
{/if}
