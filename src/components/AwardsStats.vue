<script setup lang="ts">
import { computed, Ref, ref, watchEffect } from "vue";
import { Unit } from "../types";
import { fetchData } from "../utils";
import AwardTable from "./AwardTable.vue";

const props = defineProps({
  code: { type: String, required: true },
  presetMapNames: { type: Object, required: true },
});

const units: Ref<Unit[]> = ref([]);
function unitCounts(counts: Unit[], unit_ids: number[]) {
  return Object.entries(
    counts
      .filter((unit) => unit_ids.includes(unit.unit_id))
      .reduce(
        (playerTotals, unitCount) => {
          return {
            ...playerTotals,
            [unitCount.player]:
              (playerTotals[unitCount.player] ?? 0) + unitCount.amount,
          };
        },
        {} as Record<string, number>,
      ),
  )
    .map(([player, total]) => ({ name: player, total }))
    .toSorted((a, b) => b.total - a.total)
    .slice(0, 3);
}

const monkCounts = computed(() => {
  return unitCounts(units.value, [125, 775, 1023]);
});

const militiaCounts = computed(() => {
  return unitCounts(units.value, [74]);
});

const ramsCounts = computed(() => {
  return unitCounts(units.value, [35, 422, 548, 1258]);
});

const xolotlCounts = computed(() => {
  return unitCounts(units.value, [1570]);
});

const tradeCounts = computed(() => {
  return unitCounts(units.value, [17, 128]);
});

const battleElephantCounts = computed(() => {
  return unitCounts(units.value, [1132, 1134]);
});

const elephantsCounts = computed(() => {
  return unitCounts(
    units.value,
    [1132, 1134, 239, 558, 873, 875, 1120, 1122, 1744, 1746],
  );
});

const phosphoruCounts = computed(() => {
  return unitCounts(
    units.value,
    [
      1962, 1980, 1704, 1706, 869, 871, 1001, 1003, 1738, 1739, 1740, 1759,
      1760, 1761, 1126, 1127, 1128,
    ],
  );
});

const teutonicCounts = computed(() => {
  return unitCounts(units.value, [25, 554]);
});

watchEffect(async () => {
  units.value = await fetchData(props.code, "units");
});
</script>

<template>
  <div :class="$style.container">
    <AwardTable
      :winners="monkCounts"
      title="Holy Clown"
      description="Who created the most monks, missionaries and priests."
    />
    <AwardTable
      :winners="militiaCounts"
      title="Bullyboi"
      description="Who is addicted to Militia?"
    />
    <AwardTable
      :winners="ramsCounts"
      title="Choo Choo"
      description="Who created the most rams."
    />
    <AwardTable
      :winners="xolotlCounts"
      title="Wololo Guru"
      description="Who created the most Xolotl Warriors."
    />
    <AwardTable
      :winners="tradeCounts"
      title="The Trader"
      description="Who created the most Trade Carts and Trade Cogs."
    />
    <AwardTable
      :winners="battleElephantCounts"
      title="The legend of Liar"
      description="Who created the most Battle Elephants."
    />
    <AwardTable
      :winners="elephantsCounts"
      title="The Chonker"
      description="Who created the most Elephants (of any kind!)."
    />
    <AwardTable
      :winners="phosphoruCounts"
      title="Phosphoru Disciple"
      description="Who created the most Phosphoru-esque units (War Chariots, Hussite Wagons, Magyar Huszar, Organ Guns, Ratha, Arambai)."
    />
    <AwardTable
      :winners="teutonicCounts"
      title="Grand Master of the Teutonic Order"
      description="Who created the most Teutonic Knights."
    />
  </div>
</template>

<style lang="css" module>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
