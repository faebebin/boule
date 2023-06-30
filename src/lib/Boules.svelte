<script lang="ts">
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
    /* TODO css variable in app.css */
    right: calc((100vw - 1080px) / 2);
    height: 160px;
    width: 160px;
    border-radius: 80px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    background: radial-gradient(circle at 80% 20%, #f3f1f1, #999999);
    box-shadow: -5px 10px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    color: #888787;
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
    font-weight: 700;
    font-family: inherit;
    font-size: 1.2em;
  }

  .info {
    font-size: 0.9em;
  }
</style>
