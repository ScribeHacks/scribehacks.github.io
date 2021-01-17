
<script lang="ts">
  import { onMount } from "svelte";

  let isCollapsed = false;
  function toggleCollapsed(): void {
    isCollapsed = !isCollapsed;
  }

  onMount(() => {
    window.addEventListener("resize", handleResize);
  });
  function handleResize(): void {
    console.log("hi")
    if (window.innerWidth > 768)
      isCollapsed = false;
    else isCollapsed = true;
  }
</script>

<nav class="nav">
  {#if !isCollapsed}
    <div class="collapsable">
      <a class="nav-link" href="#about">About</a>
      <a class="nav-link" href="#faq">FAQ</a>
      <a class="nav-link" href="#schedule">Schedule</a>
      <a class="nav-link" href="#venue">Map</a>
      <a class="nav-link" href="#team">Team</a>
      <a class="nav-link" href="#contact">Contact</a>
    </div>
  {/if}
  <button class="menu-control" on:click="{toggleCollapsed}" aria-label="Toggle Menu">☰</button>
</nav>

<style type="text/scss">
  .nav {
    background-color: #fff;
    border-radius: 30px;
    box-shadow: #555a 2px 2px 10px;
    display: flex;

    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 10;
    
    overflow: hidden;

    .collapsable {
      display: flex;
      flex-direction: column;
    }
  }

  .nav-link {
    color: #f00;
    text-decoration: none;

    width: 100px;
    padding: 20px 40px;
    transition-duration: 0.2s;

    &:hover {
      background-color: #f50;
      color: #fff;
    }
  }

  .menu-control {
    background: none;
    border: none;
    height: 60px;
    width: 60px;
  }

  @media (min-width: 768px) {
    .nav {
      padding: 0 25px;

      .collapsable {
        flex-direction: row;
      }
    }

    .nav-link {
      width: unset;
      padding: 20px;
    }

    .menu-control {
      display: none;
    }
  }
</style>