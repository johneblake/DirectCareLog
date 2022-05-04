<script lang="ts">
  import '../app.postcss';
  import { onMount } from 'svelte';
  import { mdiSettingsHelper, mdiViewDashboard } from '@mdi/js';
  import SideNav from '$lib/utils/ui/SideNav.svelte';
  import SideNavItem from '$lib/utils/ui/SideNavItem.svelte';

  let ready = false;
  onMount(() => (ready = true));
  let current: HTMLLIElement;
</script>

{#if ready}
  <SideNav>
    <SideNavItem icon={mdiViewDashboard} name='Log Panel' bind:current={current} isDefault/>
    <SideNavItem icon={mdiSettingsHelper} name='Settings' bind:current={current}/>
  </SideNav>
  <slot />
{/if}

<style>
</style>
