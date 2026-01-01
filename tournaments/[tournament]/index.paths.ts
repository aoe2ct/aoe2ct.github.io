import fs from "node:fs";
import yaml from "js-yaml";
import type { PageData } from "vitepress";

export default {
  transformPageData(pageData: PageData) {
    pageData.title = pageData.title.replace('%TOURNAMENT%', pageData?.params?.name);
  },
  paths() {
    const dirContents = fs.readdirSync("./data")
    const tournaments = dirContents.map(tournament => {
      const info = yaml.load(fs.readFileSync(`./data/${tournament}/tournament.yaml`));
      return { params: { tournament: tournament, name: info.name } }
    });
    return tournaments;
  }
}
