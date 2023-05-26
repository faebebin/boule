<script lang="ts">
  import bouleLogo from "/boule.svg";
  export let handleClick = () => {};
  export let title = "click me";
</script>

<button class="boules" on:click={handleClick}>
  {title}
</button>

<style>
  button {
    position: fixed;
    top: 10px;
    right: 10px;
    height: 160px;
    width: 160px;
    border-radius: 80px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
  }

  button:hover {
    border-color: #646cff;
  }

  button {
    will-change: filter;
    transition: filter 300ms;
  }
  button:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
</style>
