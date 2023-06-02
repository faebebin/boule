<script lang="ts">
  import bouleLogo from "/boule.svg";
  export let handleClick = () => {};
  export let title = "click me";
  export let info = null;
</script>

<div
  class="boule"
  on:keypress={handleClick}
  on:click={handleClick}
  role="button"
  tabindex="0"
  draggable
>
  <div class="title">{title}</div>
  {#if info}
    <div class="info">{info}</div>
  {/if}
</div>

<style>
  .boule {
    position: fixed;
    top: 10px;
    right: 10px;
    height: 160px;
    width: 160px;
    border-radius: 80px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    background-color: hsla(0, 0%, 10%, 0.226);
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .boule:hover {
    border-color: #646cff;
  }

  .boule {
    will-change: filter;
    transition: filter 300ms;
  }
  .boule:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .title {
  }

  .info {
    font-size: 0.9em;
  }
</style>
