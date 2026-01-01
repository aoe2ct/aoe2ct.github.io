<script setup lang="ts">
import { computed } from 'vue';
import BarChart, { type SeriesParam } from './BarChart.vue';


const props = defineProps(['drafts'])
const picks = computed(
  () => Object.entries(props.drafts)
    .toSorted(([_mapA, a], [_mapB, b]) => a.admin.pick + a.player.pick - b.admin.pick - b.player.pick)
);

const series: SeriesParam[] = [
  { type: "playerPicks", title: "Player picks" },
  { type: "playerSnipes", title: "Sniped picks" },
  { type: "adminPicks", title: "Admin picks" }
];

</script>
<template>
  <div>
    <BarChart title="Civilization Picks" yAxis="Picks" :counts="picks" :series="series" horizontal />
  </div>
</template>
