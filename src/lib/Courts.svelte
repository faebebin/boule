<script lang="ts">
  import { courts, teams } from "../store";
  import type { Court } from "../store";
  import { v4 as uuidv4 } from "uuid";

  let courtList: Court[] = [];
  let courtCount: number = 0;

  teams.subscribe((tl) => {
    // TODO more elegant
    // Make editable with each and bind:
    courtCount = Math.floor(tl.length / 2);
  });

  courts.subscribe((cl) => {
    courtList = cl;
  });

  function generateCourts() {
    courtList = [];
    for (let i = 0; i < courtCount; i++) {
      courtList.push({ id: uuidv4(), name: `Platz ${i + 1}` });
    }

    courts.set(courtList);
  }
</script>

{#if courtList.length > 0}
  <ul>
    {#each courtList as { name }}
      <li>
        <ul>
          {name}
        </ul>
      </li>
    {/each}
  </ul>
  <p class="soon">TODO anpassbar</p>
{/if}

{#if courtCount > 0}
  <button on:click={generateCourts}
    >{courtList.length > 0 ? "Adapt" : "Create"} Courts</button
  >
{/if}
