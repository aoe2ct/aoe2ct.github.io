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


const props = defineProps(['drafts'])
const { isDark } = useData();
provide(THEME_KEY, isDark ? "chalk" : "vintage")

const mapCounts = computed(() => {
  if (!props.drafts) {
    return [];
  }
  return Object.entries(props.drafts.reduce((acc, draft) => {
    const draftCounts = draft.draft.reduce((acc, action) => {
      if (action.action != 'pick') {
        return acc;
      }
      return { ...acc, [action.map]: action.type }
    }, {});

    return Object.entries(draftCounts).reduce((acc_inner, [map, executor]) => {
      return {
        ...acc_inner, [map]: {
          admin: (acc_inner[map]?.admin ?? 0) + (executor == "admin"),
          player: (acc_inner[map]?.player ?? 0) + (executor == "player"),
        }
      }
    }, acc)
  }, {})).sort((a, b) => b[1].admin + b[1].player - a[1].admin - a[1].player
  );
})
const option: ComputedRef<EChartsOption> = computed(() => ({
  title: {
    text: "Map Drafts"
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
    data: mapCounts.value.map(([map, _]) => map)
  },
  yAxis: {
    name: "Picks"
  },
  series: [
    {
      name: "Player picks",
      type: "bar",
      data: mapCounts.value.map(([_, count]) => count.player),
      stack: "x"
    },
    {
      name: "Admin picks",
      type: "bar",
      data: mapCounts.value.map(([_, count]) => count.admin),
      stack: "x"
    }
  ]
}));
</script>
<template>
  <div>
    <ClientOnly>
      <v-chart style="height: 500px" :option="option" />
    </ClientOnly>
    <pre>
    </pre>
  </div>
</template>
