<script setup lang="ts">
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { ComposeOption } from 'echarts/core';
import type { BarSeriesOption } from 'echarts/charts';
import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  GridComponentOption
} from 'echarts/components';
import VChart, { THEME_KEY } from "vue-echarts";
import { useData } from 'vitepress';
import { computed, ComputedRef, provide } from 'vue';
import { Counts } from '../types';

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
]);

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | GridComponentOption
  | BarSeriesOption
>;

const availableSeries = {
  adminPicks(counts: Counts[]) {
    return counts.map(([_, count]) => count.admin.pick - count.admin.snipe);
  },
  playerPicks(counts: Counts[]) {
    return counts.map(([_, count]) => count.player.pick - count.player.snipe);
  },
  playerSnipes(counts: Counts[]) {
    return counts.map(([_, count]) => count.player.snipe);
  },
  adminBans(counts: Counts[]) {
    return counts.map(([_, count]) => count.admin.ban);
  },
  playerBans(counts: Counts[]) {
    return counts.map(([_, count]) => count.player.ban);
  }
};

type Series = typeof availableSeries;
export type SeriesParam = { title: string, type: keyof Series };

const props = defineProps<{
  counts: Counts[],
  title: string,
  yAxis: string,
  series: SeriesParam[]
}>();
const { isDark } = useData();
provide(THEME_KEY, isDark ? "chalk" : "vintage")


const option: ComputedRef<EChartsOption> = computed(() => ({
  title: {
    text: props.title
  },
  tooltip: {
    show: true
  },
  xAxis: {
    type: 'category',
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      rotate: 30
    },
    data: props.counts.map(([map, _]) => map)
  },
  yAxis: {
    name: props.yAxis
  },
  series: props.series.map(series => (
    {
      name: series.title,
      type: "bar",
      data: availableSeries[series.type](props.counts),
      stack: "x"
    }))
}));
</script>
<template>
  <div>
    <ClientOnly>
      <v-chart style="height: 500px" :option="option" />
    </ClientOnly>
  </div>
</template>
