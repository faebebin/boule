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

<div class="shadow" />

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
    background: radial-gradient(circle at 80% 20%, #f3f1f1, #999999);
    box-shadow: -5px 10px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    color: #888787;
    transition: border-color 0.25s;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  @media screen and (min-width: 1080px) {
    /* TODO css variable in app.css */
    .boule {
      right: calc((100vw - 1000px) / 2);
    }
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

  .shadow {
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 100px;
    height: 20px;
    /* background-color: rgba(0, 0, 0, 1); */
    /* transition: transform 0.3s ease; */
    clip-path: ellipse(50px 10px);
    background: radial-gradient(rgba(0, 0, 0, 0.5), transparent);
  }
</style>
