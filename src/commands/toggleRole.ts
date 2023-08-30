import { GuildMemberRoleManager } from "discord.js";
import { PrefixCommand } from "../commands";

export default new PrefixCommand({
  name: "toggleRole",
  description: "Toggles a role",
  aliases: ["tr"],
  usage: "<role>",
  ownerOnly: true,
  callback: async (msg, args) => {
    if ((msg.member!.roles as GuildMemberRoleManager).cache.has(args[0])) {
      await (msg.member!.roles as GuildMemberRoleManager).remove(args[0]);
      return msg.reply(`Removed role ${args[0]}`);
    } else {
      await (msg.member!.roles as GuildMemberRoleManager).add(args[0]);
      return msg.reply(`Added role ${args[0]}`);
    }
  },
});
