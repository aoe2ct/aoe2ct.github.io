<script setup lang="ts">
import { computed } from 'vue';
import BarChart, { type SeriesParam } from './BarChart.vue';


export type GameStats = { civs: Record<string, { wins: number, losses: number, total: number, winrate: number }> };
const props = defineProps<{ games: GameStats }>()
const played = computed(
  () => Object.entries(props.games.civs)
    .toSorted(([_civA, a], [_civB, b]) => a.winrate - b.winrate)
);

const series: SeriesParam[] = [
  { type: "civWinrate" },
];

</script>
<template>
  <div>
    <BarChart title="Civilizations Win rate" yAxis="Win Rate" :counts="played" :series="series" horizontal />
  </div>
</template>
