import { Client, IntentsBitField } from "discord.js";
import config from "./config";
import { registerCommands, slashCommands, prefixCommands } from "./commands";
import { registerCallback } from "./healthcheck";

import changePfp from "./pfp";

const bot = new Client({
  intents:
    IntentsBitField.Flags.Guilds |
    IntentsBitField.Flags.GuildMessages |
    IntentsBitField.Flags.GuildMembers |
    IntentsBitField.Flags.MessageContent,
});

bot.on("ready", async () => {
  await registerCommands();
  console.log(
    `Logged in as ${bot.user!.tag}! Loaded ${
      slashCommands.size + prefixCommands.length
    } commands!`
  );

  changePfp();
});

setInterval(changePfp, 1000 * 60 * 10); // 10 minutes

registerCallback(() => {
  try {
    return bot.isReady();
  } catch (e) {
    return false;
  }
});

bot.login(config.token);

export default bot;
