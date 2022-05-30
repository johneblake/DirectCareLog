<script lang="ts">
  import '../app.postcss';
  import { onMount } from 'svelte';
  import getStore from '$lib/utils/hmr-stores';
  import type apiType from '$lib/apiType';
  import { mdiSettingsHelper, mdiViewDashboard } from '@mdi/js';
  import SideNav from 'stylite-ui/SideNav.svelte';
  import SideNavItem from 'stylite-ui/SideNavItem.svelte';
  import type Schedule from '$lib/entity/schedule';
  import type { Writable } from 'svelte/store';
  import { goto } from '$app/navigation';

  let current: any;

  let schedule: Writable<Schedule>;

  let ready = false;
  
  function saveChanges(): void {
    const myWindow = window as unknown as { api: apiType };
    schedule = getStore('schedule', {});
    myWindow.api.send('saveComplete', {
      schedule: $schedule,
    })
  }

  onMount(() => {
    const myWindow = window as unknown as { api: apiType };
    myWindow.api.send('initSave');
    myWindow.api.receive('save', () => saveChanges());
    myWindow.api.receive('data', (schedule) => {
      getStore('schedule', schedule);
      ready = true;
    });
    myWindow.api.send('initData');
    goto('/', { replaceState: true });
  });
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
