<script lang="ts">
  import Teams from "./Teams.svelte";
  import Courts from "./Courts.svelte";
  import type { Game } from "../store";
  import { v4 as uuidv4 } from "uuid";
  import { games } from "../store";
  import { get } from "svelte/store";
  import { evaluateRound, prepareNextRound, rankTeams } from "../utils";

  let gameList: Game[] = [];

  games.subscribe((gl) => {
    gameList = gl;
  });

  const round = Math.max(...gameList.map(({ round }) => round));

  function start() {
    // timer on
  }
  function stop() {
    // timer off
    evaluateRound();
  }
  function next() {
    // timer off
    // next game
    prepareNextRound(round + 1);
  }
</script>

<nav class="crumbs">
  <ol>
    <li class="crumb"><button on:click={()=>{}}>Round 1</button></li>
    <li class="crumb"><button on:click={()=>{}}>Round 2</button></li>
  </ol>
</nav>

<div>Games list Cards here</div>

<button on:click={()=>{})}>first Round</button>

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
