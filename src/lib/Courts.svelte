<script lang="ts">
  import { courts } from "../store";
  import Court from "./Court.svelte";
</script>

<div class="courts-grid">
  {#each $courts as court (court.id)}
    <Court {court} />
  {/each}
</div>
