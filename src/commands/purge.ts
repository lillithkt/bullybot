import {
  ChannelType,
  ChatInputCommandInteraction,
  GuildMember,
  SlashCommandBuilder,
  PermissionFlagsBits,
} from "discord.js";

import { SlashCommand } from "../commands";


const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Purge messages")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to purge")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  callback: async (interaction: ChatInputCommandInteraction) => {
    const amount = interaction.options.getInteger("amount", true);
    const messages = await interaction.channel?.messages.fetch({
      limit: amount,
    });
    if (!messages)
      return interaction.reply({
        content: "Could not fetch messages",
        ephemeral: true,
      });
    if (messages.size <= 1)
      return interaction.reply({
        content: "Could not purge messages",
        ephemeral: true,
      });
    messages.forEach(async (message) => await message.delete());
    interaction.reply({
      content: `Purged ${messages.size} messages`,
      ephemeral: true,
    });
  },
};

export default command;
