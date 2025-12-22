---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Age of Empires 2: Tournament Stats"
  text: "Tournament stats for Age of Empires II community and pro events"
---

<script setup>
import { data } from "./tournaments.data.ts";
import { withBase } from "vitepress";
</script>

<h3>Tournaments</h3>
<ul>
  <li v-for="tournament in data" :key="tournament.code"><a :href="withBase(`tournaments/${tournament.code}`)">{{ tournament.name }}</a></li>
</ul>
