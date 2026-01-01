import { defineConfig } from 'vitepress'
import fs from "node:fs";
import yaml from "js-yaml";

function getTournaments() {
  const dirContents = fs.readdirSync("./data")
  const tournaments = dirContents.map(tournament => {
    const info = yaml.load(fs.readFileSync(`./data/${tournament}/tournament.yaml`));
    return { code: tournament, name: info.name }
  });
  return tournaments;
}

const tournaments = getTournaments();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Age of Empires II: Tournament Stats",
  description: "Tournament stats for Age of Empires II community and pro events",
  markdown: {
    theme: {
      light: "catppuccin-latte",
      dark: "catppuccin-frappe"
    }
  },
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Tournaments',
        items: tournaments.map(tournament => ({ text: tournament.name, link: `/tournaments/${tournament.code}` }))
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aoe2ct/aoe2ct' }
    ]
  }
})
