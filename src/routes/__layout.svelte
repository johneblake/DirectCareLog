<script lang="ts">
  import '../app.postcss';
  import { onMount } from 'svelte';
  import { mdiSettingsHelper, mdiViewDashboard } from '@mdi/js';
  import SideNav from 'stylite-ui/SideNav.svelte';
  import SideNavItem from 'stylite-ui/SideNavItem.svelte';

  let ready = false;
  onMount(() => (ready = true));
  let current: any;
</script>

{#if ready}
  <SideNav>
    <svelte:fragment slot='panel'>
      <SideNavItem icon={mdiViewDashboard} name='Log Panel' bind:current={current} isDefault link='/'/>
      <SideNavItem icon={mdiSettingsHelper} name='Settings' bind:current={current} link='/settings'/>
    </svelte:fragment>
    <svelte:fragment slot='content'>
      <slot />
    </svelte:fragment>
  </SideNav>
{/if}

<style>
</style>
