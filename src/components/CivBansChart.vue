<script setup lang="ts">
import { computed } from 'vue';
import BarChart, { type SeriesParam } from './BarChart.vue';


const props = defineProps(['drafts'])
const bans = computed(
  () => Object.entries(props.drafts)
    .toSorted(([_mapA, a], [_mapB, b]) => a.admin.ban + a.player.ban - b.admin.ban - b.player.ban)
);

const series: SeriesParam[] = [
  { type: "playerBans", title: "Player bans" },
  { type: "adminBans", title: "Admin bans" }
];
</script>
<template>
  <div>
    <BarChart title="Civ bans" yAxis="Bans" :counts="bans" :series="series" horizontal />
  </div>
</template>
