<script lang="ts">
  import Teams from "./Teams.svelte";
  import Courts from "./Courts.svelte";
  import type { Game } from "../store";
  import { v4 as uuidv4 } from "uuid";
  import { games } from "../store";

  let gameList: Game[] = [];

  games.subscribe((gl) => {
    gameList = gl;
  });

  function firstRound() {}
</script>

<nav class="crumbs">
  <ol>
    <li class="crumb"><button on:click={firstRound}>Round 1</button></li>
    <li class="crumb"><button on:click={firstRound}>Round 2</button></li>
  </ol>
</nav>

<div>Games list Cards here</div>

{#if gameList.length > 0}
  <button on:click={firstRound}>first Round</button>
{/if}

<style>
  nav {
    border-bottom: 1px solid black;
  }

  .crumbs ol {
    list-style-type: none;
    padding-left: 0;
  }

  .crumb {
    display: inline-block;
  }

  .crumb button::after {
    display: inline-block;
    color: #000;
    content: ">";
    font-size: 80%;
    font-weight: bold;
    padding: 0 3px;
  }
</style>
