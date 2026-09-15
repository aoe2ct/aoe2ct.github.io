<script setup lang="ts">
import { computed } from "vue";
import TournamentOverview from "./TournamentOverview.vue";
import PlayerStats from "./PlayerStats.vue";
import UnitStats from "./UnitStats.vue";
const {
  page = "overview",
  code,
  presetMapNames,
} = defineProps<{
  page: "overview" | "players" | "results" | "units";
  code: string;
  presetMapNames: Record<string, string>;
}>();

const baseLink = computed(() => `/tournaments/${code}`);
const statsPages = {
  overview: TournamentOverview,
  results: TournamentOverview,
  players: PlayerStats,
  units: UnitStats,
};
</script>

<template>
  <h1>{{ $params.name }} stats</h1>
  <div :class="['pico', $style.subpages]">
    <div role="group">
      <a
        :href="`${baseLink}/`"
        role="button"
        :class="{ secondary: page != 'overview' }"
        >Overview</a
      >
      <!-- <a -->
      <!--   :href="`${baseLink}/results`" -->
      <!--   role="button" -->
      <!--   :class="{ secondary: page != 'results' }" -->
      <!--   >Results</a -->
      <!-- > -->
      <a
        :href="`${baseLink}/players`"
        role="button"
        :class="{ secondary: page != 'players' }"
        >Players</a
      >
      <!-- <a -->
      <!--   :href="`${baseLink}/units`" -->
      <!--   role="button" -->
      <!--   :class="{ secondary: page != 'units' }" -->
      <!--   >Units</a -->
      <!-- > -->
    </div>
  </div>
  <hr />

  <component
    :is="statsPages[page]"
    :code="code"
    :presetMapNames="presetMapNames"
  />
</template>

<style lang="css" module>
.subpages {
  margin-top: 2rem;
}
</style>
