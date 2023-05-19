<script lang="ts">
  import { courts, teams } from "../store";
  import type { Court, Team } from "../store";

  let teamsList: Team[] = [];

  teams.subscribe((tl) => {
    teamsList = tl;
  });
</script>

<ul>
  {#each teamsList as { name, points, members }, i}
    <li>
      <ul>
        {i + 1}. {name} [{members[0]}, {members[1]}]
      </ul>
    </li>
  {/each}
</ul>
