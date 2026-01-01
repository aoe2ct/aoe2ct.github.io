<script setup lang="ts">
import { computed, Ref, ref, watchEffect } from "vue";
import { withBase } from "vitepress";
import MapPicksChart from "./MapPicksChart.vue";
import MapBansChart from "./MapBansChart.vue";
import CivPickChart from "./CivPickChart.vue";
import { DraftAction, Drafts } from "../types";

const props = defineProps({
  code: { type: String, required: true }
});

const drafts: Ref<Drafts> = ref({ civDrafts: [], mapDrafts: [] })
const games = ref([])
const players = ref([])

watchEffect(async () => {
  drafts.value = await fetchData("drafts");
  games.value = await fetchData("games");
  players.value = await fetchData("players");
})

async function fetchData(type: string) {
  const response = await fetch(withBase(`/${props.code}/${type}.json`))
  return response.json()
}


function summarizeDrafts(drafts: DraftAction[]) {
  let counts = Object.fromEntries(
    drafts.map(draft => [draft.map, {
      'admin': { 'pick': 0, 'ban': 0, 'snipe': 0, 'steal': 0 },
      'player': { 'pick': 0, 'ban': 0, 'snipe': 0, 'steal': 0 }
    }])
  );

  for (let draft of drafts) {
    counts[draft.map][draft.type][draft.action] += 1;
  }
  return counts;
}
const mapCounts = computed(() => {
  if (!drafts.value?.mapDrafts) {
    return [];
  }
  return summarizeDrafts(drafts.value.mapDrafts.flatMap(draft => draft.draft));
})
const civCounts = computed(() => {
  if (!drafts.value?.civDrafts) {
    return {};
  }
  return summarizeDrafts(drafts.value.civDrafts.flatMap(draft => draft.draft));
})
</script>

<template>
  <h1>{{ $params.name }} stats</h1>
  <MapPicksChart :drafts="mapCounts" />
  <MapBansChart :drafts="mapCounts" />
  <CivPickChart :drafts="civCounts" />
</template>
