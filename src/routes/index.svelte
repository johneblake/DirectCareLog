<script lang="ts">
import type Schedule from '$lib/entity/schedule';
import Year from '$lib/entity/year';
import getStore from '$lib/utils/hmr-stores';
import Container from 'stylite-ui/Container.svelte';
import { onMount } from 'svelte';
import type { Writable } from 'svelte/store';
import { addDays } from 'date-fns';
import Week from '$lib/entity/week';

  let times = ['6', '7', '8', '9', '10', '11', '12', '1', '2',
              '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  times = times.reduce((result: string[], item: string) => {
                result.push(`${item}:00`, `${item}:30`);
                return result;
              }, []);
  let schedule: Writable<Schedule> = getStore('schedule', {});
  
  let now = new Date();
  
  let activeWeek: Week | undefined;

  onMount(() => {
    let year = $schedule.years?.find((year) => year.year === now.getFullYear());
    if (!year) {
      if (!$schedule.years) {
        $schedule.years = [];
      }
      $schedule.years.push(new Year(now.getFullYear()));
    }

    activeWeek = year?.weeks.find((week, index) => {
      if (year && year.weeks) {
        const next = (index + 1 < year.weeks.length) ?  year?.weeks[index + 1] : undefined;

        if (next && next.startDate && week.startDate) {
          return week.startDate >= now && now < addDays(next.startDate, 1);
        } else if (week.startDate) {
          return week.startDate >= now;
        } else {
          return false;
        }
      }
    });

    if (!activeWeek) {
      if (year && !year.weeks) {
        year.weeks = [];
      }
      activeWeek = new Week(now);
      year?.weeks.push(activeWeek);
    }
  });
</script>

<Container>
  <div class="flex flex-row">
    {activeWeek?.startDate}
  </div>
  <div class="h-full grid grid-cols-8 grid-flow-col">
    <div class="h-full flex flex-col">
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
