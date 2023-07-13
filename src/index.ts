import { Client } from "discord.js";
import config from "./config";
import { registerCommands, slashCommands, prefixCommands } from "./commands";

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

bot.login(config.token);

export default bot;
