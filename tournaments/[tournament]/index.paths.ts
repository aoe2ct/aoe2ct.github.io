import fs from "node:fs";
import yaml from "js-yaml";

export default {
  paths() {
    const dirContents = fs.readdirSync("./data")
    const tournaments = dirContents.map(tournament => {
      const info = yaml.load(fs.readFileSync(`./data/${tournament}/tournament.yaml`));
      return { params: { tournament: tournament, name: info.name } }
    });
    return tournaments;
  }
}
