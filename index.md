---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Age of Empires 2: Tournament Stats"
  text: "Tournament stats for Age of Empires II community and pro events"
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<script setup>
import { data } from "./tournaments.data.ts";
import { withBase } from "vitepress";
</script>

<h3>Tournaments</h3>
<ul>
  <li v-for="tournament in data" :key="tournament.code"><a :href="withBase(`tournaments/${tournament.code}`)">{{ tournament.name }}</a></li>
</ul>
<pre>{{ data }}</pre>
