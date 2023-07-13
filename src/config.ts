import { readFileSync, writeFileSync, existsSync } from "fs";
import { dirname } from "path";

interface Config {
  token: string;
  prefix: string;
  owners: string[];
}
let config: Config;

let configIsThisDir: boolean;

export function load() {
  if (existsSync("config.json")) {
    config = JSON.parse(readFileSync("config.json").toString());
    configIsThisDir = true;
  } else if (dirname(".") == "out" && existsSync("../config.json")) {
    config = JSON.parse(readFileSync("../config.json").toString());
    configIsThisDir = false;
  } else {
    config = {
      token: process.env.TOKEN || "",
      prefix: process.env.PREFIX || "!",
      owners: process.env.OWNERS?.split(",") || [],
    };
  }

  if (!config.token || !config.prefix || !config.owners.length)
    throw new Error("Missing config.json");
}

load();

config = config!!;

export default config;

export function save() {
  console.log("Saving config...");
  writeFileSync(
    `${!configIsThisDir ? "../" : ""}config.json`,
    JSON.stringify(config, null, 2)
  );
}
