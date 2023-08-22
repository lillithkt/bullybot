import { DiscordAPIError, TextChannel } from "discord.js";
import bot from ".";
import config from "./config";
import { Logger } from "./logger";
import pfp from "./commands/pfp";

const log = new Logger("Pfp", __filename);

export default async function changePfp(): Promise<boolean> {
  if (!config.pfpChannel) return false;
  log.log("Changing pfp...");
  const channel = await bot.channels.fetch(config.pfpChannel);
  if (!channel) return false;
  const messages = await (channel as TextChannel).messages.fetch();
  let pfpChosen = false;
  let success = false;
  while (!pfpChosen) {
    const message = messages.first();
    if (!message?.attachments) return messages.delete(message!.id);
    let attachment: string | undefined;
    while (!attachment) {
      const _attachment = message.attachments.random();
      if (_attachment?.url) attachment = _attachment.url;
    }
    if (!attachment) return messages.delete(message!.id);
    try {
      await bot.user?.setAvatar(attachment);
      pfpChosen = true;
      success = true;
      log.log(`Pfp changed! ${attachment}`);
    } catch (e) {
      // Ratelimit
      if ((e as DiscordAPIError).code !== 50035) console.error(e);
      else {
        pfpChosen = true;
        success = false;
        log.log("Ratelimited :(");
      }
    }
    messages.delete(message.id);
  }

  return success;
}
