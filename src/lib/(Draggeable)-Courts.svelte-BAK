<script lang="ts">
  import { courts, teams } from "../store";
  import type { Court } from "../store";
  import { v4 as uuidv4 } from "uuid";
  import { flip } from "svelte/animate";

  const dragDuration = 300;
  let courtList: Court[] = [];
  let courtCount: number = 0;

  let draggingCard;
  let animatingCards = new Set();

  export let teamsCount = 0;

  function swapWith(card) {
    if (draggingCard === card || animatingCards.has(card)) return;
    animatingCards.add(card);
    setTimeout(() => animatingCards.delete(card), dragDuration);
    const cardAIndex = courtList.indexOf(draggingCard);
    const cardBIndex = courtList.indexOf(card);
    courtList[cardAIndex] = card;
    courtList[cardBIndex] = draggingCard;
  }

  courts.subscribe((cl) => {
    courtList = cl;
  });
</script>

{#if courtList.length > 0}
  <div class="container">
    {#each courtList as court (court.id)}
      <div
        animate:flip={{ duration: dragDuration }}
        class="card gravel"
        draggable="true"
        on:dragstart={() => (draggingCard = court.name)}
        on:dragend={() => (draggingCard = undefined)}
        on:dragenter={() => swapWith(court)}
        on:dragover|preventDefault
      >
        {court.name}
      </div>
    {/each}
  </div>
{/if}
