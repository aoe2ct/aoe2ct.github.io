---
layout: false
---

<script setup>
import CivStatsTables from '../../src/components/CivStatsTables.vue';
</script>

<style>
@import url("../../src/styles/brazilian-dynasty.css");
</style>

<section class="brazilian-dynasty">
<CivStatsTables :code="$params.tournament" />
</section>
