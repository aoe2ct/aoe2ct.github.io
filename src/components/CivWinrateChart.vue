<script setup lang="ts">
import { computed } from "vue";
import BarChart, { type SeriesParam } from "./BarChart.vue";

export type GameStats = {
  civs: Record<
    string,
    { wins: number; losses: number; total: number; winrate: number }
  >;
};
const props = defineProps<{ games: GameStats }>();
const played = computed(() =>
  Object.entries(props.games.civs).toSorted(([_civA, a], [_civB, b]) => {
    if (a.winrate != b.winrate) {
      return a.winrate - b.winrate;
    }
    if (a.total != b.total) {
      return a.total - b.total;
    }
    return a.drafted - b.drafted;
  }),
);

const valueFormatter = (value, dataIndex) => {
  const civCounts = played.value[dataIndex][1];
  return `${value}% (${civCounts.total} played/${civCounts.drafted} drafted)`;
};

const series: SeriesParam[] = [{ type: "civWinrate" }];
</script>
<template>
  <div>
    <BarChart
      title="Civilizations Win rate"
      yAxis="Win Rate"
      :counts="played"
      :series="series"
      label-format="{value}%"
      :value-formatter="valueFormatter"
      horizontal
    />
  </div>
</template>
