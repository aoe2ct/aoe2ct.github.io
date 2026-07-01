---
layout: false
---

<script setup>
import MapStatsTables from '../../src/components/MapStatsTables.vue';
</script>

<style>
@import url("../../src/styles/brazilian-dynasty.css");
</style>

<section class="brazilian-dynasty">
<MapStatsTables :code="$params.tournament" :preset-map-names="$params.presetMapChoices" />
</section>
