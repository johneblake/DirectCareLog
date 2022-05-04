<script lang="ts">
import { onMount } from "svelte";

  import Icon from "./Icon.svelte";

  export let icon: string;
  export let name: string;
  export let isDefault = false;
  export let current: HTMLLIElement;

  let active: HTMLLIElement;

  function setActive(): void {
    current = active;
  }

  $: isSelected = current === active;

  onMount(() => {
    if (isDefault) {
      setActive();
    }
  });

</script>

<li class="relative" bind:this={active}>
  <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark"
    on:click={setActive}
    class:unselected={!isSelected}
    class:selected={isSelected}
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
