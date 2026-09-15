<script setup lang="ts">
const { winners } = defineProps<{
  winners: { name: string; total: number }[];
  title: string;
  description: string;
}>();
</script>
<template>
  <div class="pico">
    <hgroup>
      <h4>{{ title }}</h4>
      <small :class="$style.tiny">{{ description }}</small>
    </hgroup>
    <table class="striped">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Player</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr :class="$style.first">
          <th scope="row">1.</th>
          <td>
            <strong>{{ winners[0]?.name }}</strong>
          </td>
          <td>{{ winners[0]?.total }}</td>
        </tr>
        <tr :class="$style.second">
          <th scope="row">2.</th>
          <td>{{ winners[1]?.name }}</td>
          <td>{{ winners[1]?.total }}</td>
        </tr>
        <tr :class="$style.third">
          <th scope="row">3.</th>
          <td>{{ winners[2]?.name }}</td>
          <td>{{ winners[2]?.total }}</td>
        </tr>
      </tbody>
    </table>
    <hr />
  </div>
</template>
<style lang="css" module>
.first td {
  color: var(--vp-c-yellow-2);
}

.second td {
  color: var(--vp-c-indigo-1);
}
.third td {
  color: var(--vp-c-red-2);
}

:global(.pico) hgroup > .tiny:not(:first-child):last-child {
  font-size: 0.875rem;
}
</style>
