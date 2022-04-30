<script lang="ts">
  import '../app.postcss';
  import { onMount } from 'svelte';
  import { mdiSettingsHelper, mdiViewDashboard } from '@mdi/js';
  import SideNav from '$lib/utils/ui/SideNav.svelte';
  import SideNavItem from '$lib/utils/ui/SideNavItem.svelte';

  let ready = false;
  onMount(() => (ready = true));
  let active = 0;
</script>

{#if ready}
  <SideNav>
    <SideNavItem icon={mdiViewDashboard} name='Log Panel'/>
    <SideNavItem icon={mdiSettingsHelper} name='Settings' />
  </SideNav>
  <slot />
{/if}

<style>
</style>
