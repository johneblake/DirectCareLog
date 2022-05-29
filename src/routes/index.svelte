<script lang="ts">
import { Result } from 'postcss';

import Container from 'stylite-ui/Container.svelte';

  let times = ['6', '7', '8', '9', '10', '11', '12', '1', '2',
              '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  times = times.reduce((result: string[], item: string) => {
                result.push(`${item}:00`, `${item}:30`);
                return result;
              }, [])
</script>

<Container>
  <div class="h-full grid grid-cols-8 grid-flow-col">
    <div class="h-full flex flex-col justify-evenly">
      <div class="text-center border-b-2 border-black">Times</div>
      {#each times as time}
        <div>{time}</div>
      {/each}
    </div>
    <div class="h-full bg-emerald-100">
      <div class="text-center border-b-2 border-black">Sunday</div>
    </div>
    <div class="h-full">
      <div class="text-center border-b-2 border-black">Monday</div>
    </div>
    <div class="h-full bg-emerald-100">
      <div class="text-center border-b-2 border-black">Tuesday</div>
    </div>
    <div class="h-full">
      <div class="text-center border-b-2 border-black">Wednesday</div>
    </div>
    <div class="h-full bg-emerald-100">
      <div class="text-center border-b-2 border-black">Thursday</div>
    </div>
    <div class="h-full">
      <div class="text-center border-b-2 border-black">Friday</div>
    </div>
    <div class="h-full bg-emerald-100">
      <div class="text-center border-b-2 border-black">Saturday</div>
    </div>
  </div>
</Container>

<style>
</style>
