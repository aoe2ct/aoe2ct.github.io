<script setup lang="ts">
import { useData } from "vitepress";
import { computed, Ref, ref, watchEffect } from "vue";
import { Unit } from "../types";
import { fetchData } from "../utils";
import MapPicksChart from "./MapPicksChart.vue";
import UnitAmountChart from "./UnitAmountChart.vue";

const props = defineProps({
  code: { type: String, required: true },
  presetMapNames: { type: Object, required: true },
});
const { params } = useData();

const units: Ref<Unit[]> = ref([]);
const unitCounts = computed(() => {
  return units.value.reduce(
    (totals, playerData) => {
      if (playerData.unit_name == "Villager") return totals;
      return {
        ...totals,
        [playerData.unit_name]:
          (totals[playerData.unit_name] ?? 0) + playerData.amount,
      };
    },
    {} as Record<string, number>,
  );
});

watchEffect(async () => {
  units.value = await fetchData(props.code, "units");
});
</script>

<template>
  <div class="pico">
    <h5>Unit Stats</h5>
    <pre>
    {{ unitCounts }}
      <UnitAmountChart :units="unitCounts" />
</pre>
  </div>
</template>

<style lang="css" module>
.options {
  :global(.grid) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.bracket {
  :global(.grid) {
    grid-template-columns: repeat(3, 1fr);
  }
}

:global(.pico) {
  input[type="search"] {
    margin-top: 2rem;
  }
}

.win td {
  background-color: var(--vp-c-green-3);
}

.loss td {
  background-color: var(--vp-c-red-3);
}
</style>
