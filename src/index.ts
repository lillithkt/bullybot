import { Client } from "discord.js";
import config from "./config";
import { registerCommands, slashCommands, prefixCommands } from "./commands";
import { registerCallback } from "./healthcheck";

const bot = new Client({
  intents: ["Guilds", "MessageContent", "GuildMembers", "GuildMessages"],
});

bot.on("ready", async () => {
  await registerCommands();
  console.log(
    `Logged in as ${bot.user!.tag}! Loaded ${
      slashCommands.size + prefixCommands.length
    } commands!`
  );
});

registerCallback(() => {
  try {
    return bot.isReady();
  } catch (e) {
    return false;
  }
});

bot.login(config.token);

export default bot;
