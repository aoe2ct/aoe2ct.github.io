<script setup lang="ts">
import { computed } from "vue";
import BarChart, { type SeriesParam } from "./BarChart.vue";

const props = defineProps(["units"]);
const counts = computed(() =>
  Object.entries(props.units).toSorted(([_unitA, a], [_unitB, b]) => b - a),
);

const series: SeriesParam[] = [{ type: "unitCounts", title: "Units queued" }];
</script>
<template>
  <div>
    <BarChart
      title="Units Queued (overall, no filters)"
      yAxis="Queue"
      :counts="counts"
      :series="series"
    />
  </div>
</template>
