<script lang="ts" context="module">
  let current: HTMLAnchorElement;
</script>

<script lang="ts">
  import Icon from "./Icon.svelte";

  export let icon: string;
  export let name: string;

  let active: HTMLAnchorElement;

  function setActive(evt: Event): void {
    current = active;
  }
</script>

<li class="relative">
  <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark"
    bind:this={active}
    on:click={setActive}
    class:unselected={current != active}
    class:selected={current == active}
  >
    <Icon src={icon} class="mr-2" />
    {name}
  </a>
</li>

<style lang="postcss">
  .unselected {
    @apply text-gray-700;
  }
  .selected {
    @apply bg-gray-200;
  }
</style>
