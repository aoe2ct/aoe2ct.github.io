<script setup lang="ts">
import { computed } from 'vue';
import BarChart, { type SeriesParam } from './BarChart.vue';



const props = defineProps(['drafts'])
const picks = computed(
  () => Object.entries(props.drafts)
    .toSorted(([_mapA, a], [_mapB, b]) => b.player.pick + b.admin.pick - a.player.pick - a.admin.pick)
);

const series: SeriesParam[] = [
  { type: "playerPicks", title: "Player picks" },
  { type: "playerSnipes", title: "Sniped picks" },
  { type: "adminPicks", title: "Admin picks" }
];

</script>
<template>
  <div>
    <BarChart title="Map Picks" yAxis="Picks" :counts="picks" :series="series" />
  </div>
</template>
