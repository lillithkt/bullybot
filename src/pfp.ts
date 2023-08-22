import { DiscordAPIError, TextChannel } from "discord.js";
import bot from ".";
import config from "./config";
import { Logger } from "./logger";
import pfp from "./commands/pfp";

const log = new Logger("Pfp", __filename);

let oldPfp: string | undefined;

export default async function changePfp(): Promise<boolean> {
  if (!config.pfpChannel) return false;
  const channel = await bot.channels.fetch(config.pfpChannel);
  if (!channel) return false;
  const messages = await (channel as TextChannel).messages.fetch();
  let pfpChosen = false;
  let success = false;
  while (!pfpChosen) {
    const message = messages.first();
    if (!message?.attachments) {
      messages.delete(message!.id);
      continue;
    }
    let attachment: string | undefined;
    while (!attachment) {
      const _attachment = message.attachments.random();
      if (!_attachment?.url) continue;
      if (_attachment.url === oldPfp) continue;
      attachment = _attachment.url;
    }
    if (!attachment) {
      messages.delete(message.id);
      continue;
    }
    try {
      await bot.user?.setAvatar(attachment);
      pfpChosen = true;
      success = true;
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
