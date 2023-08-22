import { MessageCreateOptions, TextChannel } from "discord.js";

import config from "./config";
import bot from ".";

export class Logger {
  prefix: string;
  color: number;
  fileName: string;

  constructor(prefix: string, fileName: string, color: number = 0) {
    this.prefix = prefix;
    this.color = color;
    this.fileName = fileName.split("out/")[1];
  }

  log(
    message: string | MessageCreateOptions,
    _options?: { color?: number }
  ): string {
    console.log(`[${this.prefix}] ${message}`);

    if (!config.logChannel)
      return typeof message === "string" ? message : message.content!;

    try {
      const logChannel = bot.channels.cache.get(config.logChannel);

      if (!logChannel)
        return typeof message === "string" ? message : message.content!;

      const options = _options || {};
      if (typeof message === "string") {
        (logChannel as TextChannel).send({
          embeds: [
            {
              title: `[${this.prefix}]`,
              url: `https://github.com/imlvna/bullybot/blob/main/src/${this.fileName}`,
              description: message,
              color: options.color || this.color,
            },
          ],
        });
        return message;
      } else (logChannel as TextChannel).send(message);
      return message.content!;
    } catch (e) {
      return typeof message === "string" ? message : message.content!;
    }
  }
}
