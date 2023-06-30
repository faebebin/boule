<script lang="ts">
  import { courts, teams } from "../store";
  import type { Court } from "../store";
  import CourtGravel from "./Court.svelte";
</script>

<div class="container">
  {#each $courts as court (court.id)}
    <CourtGravel {court} />
  {/each}
</div>
