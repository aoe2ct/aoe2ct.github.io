<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { withBase } from "vitepress";
import MapDraftChart from "./MapDraftChart.vue";

const props = defineProps({
  code: { type: String, required: true }
});

const drafts = ref({})
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

</script>

<template>
  <h1>{{ $params.name }} stats</h1>
  This is the component {{ props.code }}
  <MapDraftChart :drafts="drafts?.mapDrafts" />
</template>
