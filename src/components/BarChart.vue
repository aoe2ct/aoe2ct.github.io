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
  },
  civPlayed(counts) {
    return counts.map(([_, count]) => count);
  },
  civWinrate(counts) {
    return counts.map(([_, count]) => count.winrate);
  }
};

type Series = typeof availableSeries;
export type SeriesParam = { title?: string, type: keyof Series };

const { counts, title, yAxis, series, horizontal = false } = defineProps<{
  counts: Counts[],
  title: string,
  yAxis: string,
  series: SeriesParam[],
  horizontal?: boolean
}>();
const { isDark } = useData();
provide(THEME_KEY, isDark ? "chalk" : "vintage")


const option: ComputedRef<EChartsOption> = computed(() => {
  const labels = counts.map(([map, _]) => map);
  return {
    title: {
      text: title
    },
    tooltip: {
      show: true
    },
    xAxis: {
      name: horizontal ? yAxis : undefined,
      type: horizontal ? 'value' : 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        rotate: 30
      },
      data: horizontal ? undefined : labels
    },
    yAxis: {
      name: horizontal ? undefined : yAxis,
      type: horizontal ? 'category' : 'value',
      data: horizontal ? labels : undefined
    },
    series: series.map(series => (
      {
        name: series.title,
        type: "bar",
        data: availableSeries[series.type](counts),
        stack: "x",
        markLine: series.type == 'civWinrate' ? {} : undefined
      }))
  }
});
</script>
<template>
  <div>
    <ClientOnly>
      <v-chart :style="{ height: horizontal ? '1000px' : '500px' }" :option="option" />
    </ClientOnly>
  </div>
</template>
